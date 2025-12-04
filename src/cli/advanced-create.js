#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function advancedCreateCommand(projectName) {
  const templatePath = path.join(__dirname, '../../templates/uv-app');
  const targetPath = path.resolve(`./${projectName}`);

  if (!fs.existsSync(templatePath)) {
    console.error(`[Proxtem] UV template not found at ${templatePath}`);
    process.exit(1);
  }

  if (fs.existsSync(targetPath)) {
    console.error(`[Proxtem] Project "${projectName}" already exists at ${targetPath}`);
    process.exit(1);
  }

  fs.mkdirSync(targetPath, { recursive: true });
  fs.cpSync(templatePath, targetPath, { recursive: true });

  console.log(`[Proxtem] Advanced UV proxy scaffolded to "${projectName}"`);
  console.log(`[Proxtem] Next steps: cd ${projectName} && npm install && see README.md for running instructions`);
}
