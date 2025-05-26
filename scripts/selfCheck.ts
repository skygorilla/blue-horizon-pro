import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

async function selfCheck() {
  try {
    console.log('🛠️  Running ESLint with --fix...');
    execSync('npx eslint src --ext .ts,.tsx --fix', { stdio: 'inherit' });

    console.log('🛠️  Running TypeScript type-check...');
    execSync('npx tsc --noEmit', { stdio: 'inherit' });

    const mainFile = path.resolve(__dirname, '../src/main.tsx');
    let content = fs.readFileSync(mainFile, 'utf8');
    if (content.includes('path="/"')) {
      console.log('🔧  Converting <Route path="/"> to <Route path="/*"> in main.tsx');
      content = content.replace(/path="\/"/g, 'path="/*"');
      fs.writeFileSync(mainFile, content, 'utf8');
      console.log('✅  Updated main.tsx with wildcard route.');
    } else {
      console.log('✅  main.tsx already uses wildcard route or no direct path="/" found.');
    }

    console.log('🎉  Self-check complete, no critical issues detected or automatically resolved.');
  } catch (error: unknown) { // Changed from any to unknown
    // Check if error is an object with a message property
    const message = (typeof error === 'object' && error !== null && 'message' in error) ? (error as { message: string }).message : String(error);
    console.error('❌  Self-check encountered errors:', message);
    process.exit(1);
  }
}

selfCheck();