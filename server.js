import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // Import fileURLToPath
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { google } from 'googleapis'; // Import googleapis
import winston from 'winston';

// Suppress source map warnings in development
process.env.NODE_OPTIONS = '--no-warnings';

// Replicate __dirname functionality in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure logs directory exists
const logDir = path.resolve(__dirname, 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logDir, 'combined.log') })
  ]
});

// Explicitly configure dotenv path
dotenv.config({ path: path.resolve(__dirname, '.env') });

logger.info(`Loaded API KEY from .env: ${process.env.GEMINI_API_KEY}`); // Test line
import fetch from 'node-fetch';

const app = express();
const port = 3001; // Changed from 8080 to 3001

// IMPORTANT: Basic CORS setup - allows requests from any origin.
// For production, configure this more securely!
app.use(cors());
app.use(bodyParser.json());

// Define the root directory of the project for file path resolution
// Adjust this path if your server file is located elsewhere relative to the project root
const projectRoot = path.resolve(__dirname);

// Initialize Gemini client
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  logger.error('Missing GEMINI_API_KEY environment variable');
  process.exit(1);
}
const genAIClient = new GoogleGenerativeAI(GEMINI_API_KEY);
// Try using gemini-pro instead of gemini-1.5-flash-latest
const geminiModel = genAIClient.getGenerativeModel({ model: 'gemini-pro' });

// Setup OAuth2 client for Google Calendar
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CALENDAR_CLIENT_ID,
  process.env.GOOGLE_CALENDAR_CLIENT_SECRET
);
const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// Add a route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

// API endpoint to handle file edits
app.post('/api/edit-file', (req, res) => {
  const { filePath, content } = req.body;

  if (!filePath || typeof content === 'undefined') {
    return res.status(400).json({ error: 'Missing filePath or content in request body' });
  }

  // **SECURITY WARNING:** Basic path validation.
  // This is NOT sufficient for production. A real implementation needs
  // much stricter validation to prevent directory traversal attacks (e.g., '../../etc/passwd').
  // It should only allow editing within specific, safe directories (like 'src').
  const absoluteFilePath = path.resolve(projectRoot, filePath);
  if (!absoluteFilePath.startsWith(path.resolve(projectRoot, 'src'))) { // Example restriction
     return res.status(403).json({ error: 'Forbidden: File path is outside the allowed directory.' });
  }

  logger.info(`Attempting to write file: ${absoluteFilePath}`);

  fs.writeFile(absoluteFilePath, content, 'utf8', (err) => {
    if (err) {
      logger.error('Error writing file:', err);
      return res.status(500).json({ error: 'Failed to write file', details: err.message });
    }
    logger.info(`File written successfully: ${absoluteFilePath}`);
    res.status(200).json({ message: 'File updated successfully' });
  });
});

// Endpoint for simple text generation via Gemini
app.post('/api/gemini/ask', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });
  try {
    const result = await geminiModel.generateContent(prompt);
    const text = result.response.text();
    return res.json({ text });
  } catch (err) {
    logger.error('Gemini ask error:', err);
    return res.status(500).json({ error: err.message || 'Gemini ask failed' });
  }
});

// Endpoint for operational actions via Gemini
app.post('/api/gemini/operate', async (req, res) => {
  logger.info('Received /api/gemini/operate request body:', req.body); // Log the received body
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

  // Construct operational prompt
  const operationalPrompt = `You are an AI assistant with the ability to modify this web application. 
Analyze the following user request and respond with a JSON object describing the action to take. 
Examples:
- To edit a file: { "type": "editFile", "path": "src/components/Header.tsx", "content": "<new content>" }
- To add a database entry: { "type": "dbInsert", "table": "users", "data": { ... } }

User Request: ${prompt}

Respond ONLY with the JSON object for the action.`;

  try {
    const result = await geminiModel.generateContent(operationalPrompt);
    logger.info('Full Gemini generateContent result:', result);
    if (!result || !result.response) {
      logger.error('No response object from generateContent:', result);
    }
    logger.info('Response candidates:', result.response.candidates);
    let raw = result.response.text();
    logger.info('Gemini raw response text:', raw);
    // Fallback: if raw is empty, build from response.candidates parts
    const candidates = result.response.candidates;
    if (!raw && Array.isArray(candidates) && candidates.length > 0) {
      const first = candidates[0];
      raw = first.content.parts.map(p => p.text || '').join('');
      logger.info('Fallback raw from candidates.parts:', raw);
    }
    if (!raw) {
      logger.error('Empty response from Gemini');
      return res.status(500).json({ error: 'Empty response from Gemini', details: raw });
    }
    // Clean and parse: strip code fences and extract JSON object
    let cleaned = raw.trim();
    // Remove any triple-backtick fences
    if (cleaned.startsWith('```')) {
      const lines = cleaned.split('\n');
      // remove opening fence line
      lines.shift();
      // remove closing fence line if present
      if (lines[lines.length - 1].startsWith('```')) lines.pop();
      cleaned = lines.join('\n').trim();
    }
    // Extract substring between first '{' and last '}'
    const jsonStart = cleaned.indexOf('{');
    const jsonEnd = cleaned.lastIndexOf('}');
    if (jsonStart >= 0 && jsonEnd >= 0 && jsonEnd > jsonStart) {
      cleaned = cleaned.substring(jsonStart, jsonEnd + 1);
    }
    logger.info('Final cleaned JSON string:', cleaned);
    let action;
    try {
      action = JSON.parse(cleaned);
      logger.info('Parsed action object:', action);
    } catch (pe) {
      logger.error('Error parsing JSON from Gemini:', pe);
      return res.status(500).json({ error: 'Invalid JSON from Gemini', details: raw });
    }
    // Execute action
    if (action.type === 'editFile' && action.path && typeof action.content === 'string') {
      logger.info('Executing editFile action:', action.path);
      try {
        const editResponse = await fetch(`http://localhost:${port}/api/edit-file`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ filePath: action.path, content: action.content }),
        });
        const editData = await editResponse.json();
        logger.info('Edit file response:', editData);
        if (!editResponse.ok) {
          return res.status(editResponse.status).json({ error: editData.error || 'Edit file failed', details: editData.details });
        }
        logger.info('Sending operate endpoint response message:', editData.message);
        return res.json({ message: editData.message });
      } catch (e) {
        logger.error('Error executing file edit via fetch:', e);
        return res.status(500).json({ error: e.message });
      }
    }
    // Not implemented
    logger.info('Action type not handled, returning default message');
    return res.json({ message: `Action not implemented: ${JSON.stringify(action)}` });
  } catch (err) {
    // Log the full error object for more details
    logger.error('Gemini operate error:', err);
    // Ensure a JSON response even on error
    const errorMessage = err instanceof Error ? err.message : 'Unknown Gemini operate failed';
    return res.status(500).json({ error: 'Calendar sync failed', details: err.message });
  }
});

// Endpoint for scanning invoices (mock)
app.post('/api/scan-invoice', async (req, res) => {
  try {
    // Stubbed response: list of inventory updates
    const updates = [
      { ingredient_id: '00000000-0000-0000-0000-000000000001', qty_added: 100 },
      { ingredient_id: '00000000-0000-0000-0000-000000000002', qty_added: 50 }
    ];
    return res.json({ updates });
  } catch (err) {
    logger.error('Invoice scan error:', err);
    return res.status(500).json({ error: 'Invoice scan failed', details: err.message });
  }
});

// API endpoint to handle logging from frontend
app.post('/api/logs', (req, res) => {
  const { logs, timestamp, source } = req.body;
  
  if (!logs || !Array.isArray(logs)) {
    return res.status(400).json({ error: 'Missing or invalid logs array' });
  }
  
  // Log to server console for debugging
  console.log(`Received ${logs.length} logs from ${source || 'unknown'} at ${timestamp || new Date().toISOString()}`);
  
  // Write logs to the log file using winston
  logs.forEach(logEntry => {
    const level = logEntry.level?.toString().toLowerCase() || 'info';
    const validLevel = ['debug', 'info', 'warn', 'error'].includes(level) ? level : 'info';
    
    logger[validLevel](logEntry.message, {
      source: source || 'frontend',
      component: logEntry.component,
      details: logEntry.details,
      clientTimestamp: logEntry.timestamp,
      sessionId: logEntry.sessionId,
      user: logEntry.user,
      tags: logEntry.tags,
    });
  });
  
  res.status(200).json({ message: `Successfully logged ${logs.length} entries` });
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
