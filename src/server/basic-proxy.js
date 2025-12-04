import express from 'express';
import fetch from 'node-fetch';

export default function createProxy(target) {
  const app = express();

  app.use(async (req, res) => {
    const url = target + req.url;
    const response = await fetch(url, {
      method: req.method,
      headers: req.headers,
      body: req.method !== 'GET' ? req.body : undefined
    });
    const text = await response.text();
    res.send(text);
  });

  return app;
}
