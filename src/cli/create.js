#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createCommand(projectName) {
  const templatePath = path.join(__dirname, '../../templates/base-app'); // relative to package
  const targetPath = path.resolve(`./${projectName}`);

  if (!fs.existsSync(templatePath)) {
    console.error(`[Proxtem] Template folder not found at ${templatePath}`);
    process.exit(1);
  }

  fs.mkdirSync(targetPath, { recursive: true });

  // Copy template recursively
  fs.cpSync(templatePath, targetPath, { recursive: true });

  console.log(`[Proxtem] Project "${projectName}" created from template!`);

  // Auto-install dependencies
  try {
    console.log('[Proxtem] Installing dependencies...');
    execSync('npm install', { cwd: targetPath, stdio: 'inherit' });
    console.log('[Proxtem] Dependencies installed!');
  } catch (err) {
    console.error('[Proxtem] Failed to install dependencies. You may need to run "npm install" manually.');
  }
}
