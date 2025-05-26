#!/usr/bin/env node

/**
 * AI Development Helper for Blue Horizon Pro
 * 
 * This script provides command-line utilities to leverage GitHub Copilot
 * for advanced code generation similar to Lovable.dev 2.0 capabilities.
 * 
 * Usage:
 *   node scripts/ai-helper.js generate-component "Description of component"
 *   node scripts/ai-helper.js generate-feature "Description of feature"
 *   node scripts/ai-helper.js save-templates
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { formatTemplate, saveTemplates } from '../.ai-temp/copilot-presets.js';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the .ai-temp directory exists
const aiTempDir = path.join(__dirname, '../.ai-temp');
if (!fs.existsSync(aiTempDir)) {
  fs.mkdirSync(aiTempDir, { recursive: true });
}

// Parse command line arguments
const [, , command, ...args] = process.argv;

switch (command) {
  case 'generate-component':
    generateComponent(args.join(' '));
    break;
  case 'generate-feature':
    generateFeature(args.join(' '));
    break;
  case 'save-templates':
    saveTemplates();
    break;
  case 'help':
  default:
    printHelp();
    break;
}

/**
 * Generate a component using GitHub Copilot
 * @param {string} description - Component description
 */
function generateComponent(description) {
  if (!description) {
    console.error('Please provide a component description');
    process.exit(1);
  }

  console.log('🧠 Preparing to generate component...');
  console.log(`Description: ${description}`);
  
  // Create a prompt file using the template
  const prompt = formatTemplate('COMPONENT_TEMPLATE', { description });
  const promptFile = path.join(aiTempDir, 'component-prompt.md');
  fs.writeFileSync(promptFile, prompt);
  
  console.log('\n✅ Prompt saved to .ai-temp/component-prompt.md');
  console.log('\n🚀 Next steps:');
  console.log('1. Open VS Code Command Palette (Ctrl+Shift+P)');
  console.log('2. Run "Tasks: Run Task"');
  console.log('3. Select "AI: Generate Component"');
  console.log('4. Follow the instructions to use GitHub Copilot Chat with the saved prompt');
}

/**
 * Generate a multi-file feature using GitHub Copilot
 * @param {string} description - Feature description
 */
function generateFeature(description) {
  if (!description) {
    console.error('Please provide a feature description');
    process.exit(1);
  }

  console.log('🧠 Preparing to generate complete feature implementation...');
  console.log(`Description: ${description}`);
  
  // Create a prompt file using the template
  const prompt = formatTemplate('FEATURE_TEMPLATE', { description });
  const promptFile = path.join(aiTempDir, 'feature-prompt.md');
  fs.writeFileSync(promptFile, prompt);
  
  console.log('\n✅ Prompt saved to .ai-temp/feature-prompt.md');
  console.log('\n🚀 Next steps:');
  console.log('1. Open VS Code Command Palette (Ctrl+Shift+P)');
  console.log('2. Run "Tasks: Run Task"');
  console.log('3. Select "AI: Generate Feature (Multiple Files)"');
  console.log('4. Follow the instructions to use GitHub Copilot Chat with the saved prompt');
}

/**
 * Print help information
 */
function printHelp() {
  console.log(`
AI Development Helper for Blue Horizon Pro
------------------------------------------

This tool helps leverage GitHub Copilot for advanced code generation
similar to Lovable.dev 2.0 capabilities.

Available commands:

  generate-component "Description"
    Prepares a prompt for generating a React component
    
  generate-feature "Description"
    Prepares a prompt for generating a complete feature implementation
    
  save-templates
    Saves all prompt templates to the .ai-temp directory for reference
    
  help
    Displays this help message

Examples:

  node scripts/ai-helper.js generate-component "A responsive chart component that visualizes meal nutrition data with filtering options"
  
  node scripts/ai-helper.js generate-feature "A user preferences system that allows users to set and save their dietary restrictions, allergies, and meal preferences"
  `);
}