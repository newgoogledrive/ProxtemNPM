#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

export function createCommand(projectName) {
  const templatePath = path.resolve('./templates/base-app');
  const targetPath = path.resolve(`./${projectName}`);

  fs.mkdirSync(targetPath, { recursive: true });

  // Copy template recursively
  fs.cpSync(templatePath, targetPath, { recursive: true });

  console.log(`[Proxtem] Project "${projectName}" created from template!`);
}