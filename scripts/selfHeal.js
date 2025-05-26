#!/usr/bin/env node
import fs from 'fs';
import path, { dirname } from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Resolve __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Root folder
const rootDir = path.resolve(__dirname, '..');
const logDir = path.join(rootDir, 'logs');
const logFile = path.join(logDir, 'self-heal.log');

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

// Check for .env file
function checkEnv() {
  const envPath = path.join(rootDir, '.env');
  if (!fs.existsSync(envPath)) {
    log('.env file is missing');
    console.warn('Missing .env file. Please create one, e.g.: cp .env.example .env');
  } else {
    log('.env file found');
    validateEnvKeys(envPath);
  }
}

// Validate required keys in .env
function validateEnvKeys(envPath) {
  try {
    const content = fs.readFileSync(envPath, 'utf-8');
    const lines = content.split(/\r?\n/);
    const keys = ['GEMINI_API_KEY', 'SUPABASE_URL', 'SUPABASE_ANON_KEY'];
    const missing = keys.filter(key => !lines.some(line => line.startsWith(key + '=')));
    if (missing.length) {
      log('Missing env keys: ' + missing.join(', '));
      console.warn('Missing keys in .env:', missing.join(', '));
    } else {
      log('All required env keys present');
    }
  } catch (err) {
    log('Error reading .env: ' + err.message);
  }
}

// Check node_modules folder
function checkNodeModules() {
  const modulesPath = path.join(rootDir, 'node_modules');
  if (!fs.existsSync(modulesPath)) {
    log('node_modules folder is missing');
    console.warn('node_modules missing. Running npm install...');
    try {
      execSync('npm install', { cwd: rootDir, stdio: 'inherit' });
      log('npm install completed');
    } catch (err) {
      log('npm install failed: ' + err.message);
    }
  } else {
    log('node_modules folder found');
  }
}

// Check specific packages
function checkPackages() {
  const pkgs = ['express', 'dotenv', '@supabase/supabase-js'];
  const missing = [];
  pkgs.forEach(name => {
    const pkgPath = path.join(rootDir, 'node_modules', ...name.split('/'));
    if (!fs.existsSync(pkgPath)) missing.push(name);
  });
  if (missing.length) {
    log('Missing packages: ' + missing.join(', '));
    console.warn('Missing packages:', missing.join(', '), '. Installing...');
    try {
      execSync(`npm install ${missing.join(' ')}`, { cwd: rootDir, stdio: 'inherit' });
      log('Installed missing packages: ' + missing.join(', '));
    } catch (err) {
      log('npm install missing packages failed: ' + err.message);
    }
  } else {
    log('All key packages are installed');
  }
}

// Main routine
(function main() {
  ensureLogDir();
  log('Starting self-heal checks');
  try {
    checkEnv();
    checkNodeModules();
    checkPackages();
    log('Self-heal complete');
  } catch (err) {
    log('Unexpected error: ' + err.message);
    console.error('Self-heal encountered an error:', err);
  }
})();