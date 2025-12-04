#!/usr/bin/env node
import express from 'express';
import createProxy from '../server/basic-proxy.js';
import middleware from '../server/express-middleware.js';

export function devCommand() {
  const app = createProxy('http://localhost:3000'); // Replace with your target
  app.use(middleware());

  const port = 4000;
  app.listen(port, () => {
    console.log(`[Proxtem] Dev server running on http://localhost:${port}`);
  });
}
