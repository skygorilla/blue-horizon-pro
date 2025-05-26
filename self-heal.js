// self-heal.js
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Helper Functions ---
function logInfo(message) { console.log(`ℹ️ ${message}`); }
function logWarn(message) { console.warn(`⚠️ ${message}`); }
function logError(message) { console.error(`❌ ${message}`); }
function logSuccess(message) { console.log(`✅ ${message}`); }
function logAction(message) { console.log(`🔧 ${message}`); }
function logDebug(message) { /* console.log(`🐛 ${message}`); */ } // Uncomment for debug

function runCommand(command, errorMessage) {
    try {
        logDebug(`Running command: ${command}`);
        execSync(command, { stdio: 'inherit' });
        return true;
    } catch (error) {
        logError(`${errorMessage}: ${error.message}`);
        return false;
    }
}
// --- End Helper Functions ---

logInfo('Starting environment self-check...');

// 1. Check and handle .env file
const envPath = path.join(__dirname, '.env');
const oldEnvPath = path.join(__dirname, 'env'); // Check for old 'env' file

if (!fs.existsSync(envPath)) {
    logWarn('.env file is missing!');
    if (fs.existsSync(oldEnvPath)) {
        logAction(`Found old "env" file, renaming to ".env"...`);
        try {
            fs.renameSync(oldEnvPath, envPath);
            logSuccess('.env file renamed successfully.');
        } catch (renameError) {
            logError(`Failed to rename "env" to ".env": ${renameError.message}`);
            process.exit(1);
        }
    } else {
        logAction('Creating a placeholder .env file...');
        try {
            fs.writeFileSync(envPath, 'GEMINI_API_KEY=\n');
            logWarn('Placeholder .env created. Please add your actual GEMINI_API_KEY.');
            process.exit(1);
        } catch (writeError) {
            logError(`Failed to create .env file: ${writeError.message}`);
            process.exit(1);
        }
    }
} else {
    logDebug('.env file exists.');
}

// 2. Check GEMINI_API_KEY within .env
let envContent = '';
try {
    envContent = fs.readFileSync(envPath, 'utf-8');
} catch (readError) {
    logError(`Error reading .env file: ${readError.message}`);
    process.exit(1);
}

// Use the key from context if available, otherwise check the file content pattern
const apiKeyFromContext = "AIzaSyCPy6F4AfjXBv7Te6GGPMNZ7xWvx7_Mpj4"; // From context
const apiKeyPattern = /^GEMINI_API_KEY=AIza[A-Za-z0-9_-]{35}$/m; // Basic pattern check

if (envContent.includes(`GEMINI_API_KEY=${apiKeyFromContext}`) || apiKeyPattern.test(envContent)) {
     logSuccess('GEMINI_API_KEY found and seems set in .env file.');
} else if (!envContent.includes('GEMINI_API_KEY=') || envContent.match(/^GEMINI_API_KEY=\s*$/m)) {
    logError('GEMINI_API_KEY is not set or is empty in .env file.');
    process.exit(1);
} else {
    logWarn('GEMINI_API_KEY is present but does not match expected format/value. Please verify it.');
    // Decide if this should be a fatal error or just a warning
    // process.exit(1);
}


// 3. Check node_modules and run npm install if needed
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
    logWarn('node_modules directory is missing.');
    logAction('Attempting to install dependencies (this might take a moment)...');

    // Ensure prepare script is commented out before running install
    const packageJsonPath = path.join(__dirname, 'package.json');
    let packageJsonContent = '';
    let prepareScriptModified = false;
    try {
        packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8');
        if (packageJsonContent.includes('"prepare": "husky install"')) {
            logInfo('Temporarily commenting out "prepare" script in package.json...');
            packageJsonContent = packageJsonContent.replace('"prepare": "husky install"', '"_prepare_disabled_by_self_heal": "husky install"'); // Rename to disable
            fs.writeFileSync(packageJsonPath, packageJsonContent);
            prepareScriptModified = true;
        }
    } catch (pkgJsonError) {
        logError(`Failed to read/modify package.json: ${pkgJsonError.message}`);
        process.exit(1);
    }

    if (!runCommand('npm install', 'Failed to install dependencies')) {
        // Attempt to restore package.json if modified
        if (prepareScriptModified) {
             packageJsonContent = packageJsonContent.replace('"_prepare_disabled_by_self_heal": "husky install"', '"prepare": "husky install"');
             fs.writeFileSync(packageJsonPath, packageJsonContent);
        }
        process.exit(1);
    }

    // Restore package.json if modified
    if (prepareScriptModified) {
         logInfo('Restoring "prepare" script in package.json...');
         packageJsonContent = packageJsonContent.replace('"_prepare_disabled_by_self_heal": "husky install"', '"prepare": "husky install"');
         fs.writeFileSync(packageJsonPath, packageJsonContent);
    }
    logSuccess('Dependencies installed.');

} else {
    logSuccess('node_modules directory exists.');
}

// 4. Check express specifically
const expressPath = path.join(nodeModulesPath, 'express');
if (!fs.existsSync(expressPath)) {
    logWarn('express package is missing inside node_modules.');
    logAction('Attempting to install express specifically...');
    if (!runCommand('npm install express', 'Failed to install express')) {
        process.exit(1);
    }
    logSuccess('express installed.');
} else {
    logSuccess('express package found in node_modules.');
}

// 5. Husky setup (if .husky folder exists)
const huskyConfigPath = path.join(__dirname, '.husky');
if (fs.existsSync(huskyConfigPath)) {
    logAction('Checking Husky setup...');
    // Check if hooks are already installed (e.g., pre-commit exists)
    const preCommitHookPath = path.join(huskyConfigPath, 'pre-commit');
    if (!fs.existsSync(preCommitHookPath)) {
        logInfo('Husky hooks seem missing, running husky install...');
        if (!runCommand('npx husky install', 'Husky setup command failed')) {
             logWarn('Husky setup failed. Git hooks might not work correctly. (Ignoring if Husky is not critical)');
        } else {
             logSuccess('Husky setup complete.');
        }
    } else {
        logSuccess('Husky hooks seem to be installed.');
    }
} else {
    logInfo('Husky config (.husky/) not found, skipping setup.');
}

// 6. Final instructions
console.log('\n--------------------------------------------------');
logSuccess('Environment self-check complete!');
logInfo('Based on the checks, the environment appears ready.');
console.log('🚀 You can now attempt to start the servers:');
console.log('\n👉 In one terminal, run the backend:');
console.log('   npm run server');
console.log('\n👉 In another terminal, run the frontend:');
console.log('   npm run dev');
console.log('\n✨ Or, try running both concurrently:');
console.log('   npm run dev:all');
console.log('--------------------------------------------------');
