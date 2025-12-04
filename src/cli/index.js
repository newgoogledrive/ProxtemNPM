#!/usr/bin/env node
import { Command } from 'commander';
import { createCommand } from './create.js';
import { devCommand } from './dev.js';
import { deployRenderCommand } from './deploy-render.js';
import { deployVercelCommand } from './deploy-vercel.js';

const program = new Command();

program
  .name('proxtem')
  .description('CLI to manage Proxtem proxies and apps')
  .version('0.1.0');

program
  .command('create <name>')
  .description('Create a new project')
  .action(createCommand);

program
  .command('dev')
  .description('Run development server')
  .action(devCommand);

program
  .command('deploy:render')
  .description('Deploy project to Render')
  .action(deployRenderCommand);

program
  .command('deploy:vercel')
  .description('Deploy project to Vercel')
  .action(deployVercelCommand);

program.parse(process.argv);
