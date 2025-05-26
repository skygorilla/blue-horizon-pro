#!/usr/bin/env node
const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const http = require('http');

// Root and target paths
const rootDir = path.resolve(__dirname, '..');
const envPath = path.join(rootDir, '.env');
const notesPath = path.join(rootDir, '.ai', 'config_notes.md');
const logDir = path.join(rootDir, 'logs');
const logFile = path.join(logDir, 'config-watcher.log');

// Ensure logs directory exists
function ensureLogDir() {
  try {
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  } catch (err) {
    console.error('Failed to create logs directory:', err);
  }
}

// Append entry to log file with timestamp
function log(message) {
  const timestamp = new Date().toISOString();
  const entry = `[${timestamp}] ${message}\n`;
  try {
    fs.appendFileSync(logFile, entry);
  } catch (err) {
    console.error('Failed to write to log:', err);
  }
}

// Send reload request
function sendReload() {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/system/reload-config',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  };

  const req = http.request(options, res => {
    // consume response
    res.on('data', () => {});
    res.on('end', () => {});
  });
  req.on('error', () => {});
  req.end();
}

// Watch files for changes
function watchFiles() {
  ensureLogDir();
  log('Starting config watcher');
  // Determine files to watch, skip missing notes
  const filesToWatch = [envPath];
  if (fs.existsSync(notesPath)) {
    filesToWatch.push(notesPath);
  } else {
    log('.ai/config_notes.md not found, skipping notes watcher');
  }
  const watcher = chokidar.watch(filesToWatch, { persistent: true, ignoreInitial: true });

  watcher.on('change', filePath => {
    const relative = path.relative(rootDir, filePath);
    const message = `⚙️ Config updated at ${new Date().toISOString()} (${relative})`;
    console.log(message);
    log(message);
    // attempt reload
    try {
      sendReload();
      log('Sent reload request');
    } catch (err) {
      log('Reload request failed');
    }
  });

  watcher.on('error', error => {
    console.error('Watcher error:', error);
    log('Watcher error: ' + error.message);
  });
}

// Start watching
watchFiles();