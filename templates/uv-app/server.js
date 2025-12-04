import express from 'express';

const app = express();

// Serve local files (static assets for admin / UI)
app.use(express.static('.'));

// If UV is available, we'll mount it; otherwise show instructions.
let usingUV = false;

async function tryMountUV() {
  try {
    // dynamic import so the template can be created without having the packages installed
    const uv = await import('@tomphttp/uv'); // may throw if not installed or API changed
    const bare = await import('@tomphttp/bare');

    // NOTE: exact API usage may differ between versions of UV/bare.
    // This is a defensive attempt to create a UV server and mount it under /service.
    // If the API differs, the imports above will still succeed but the usage below may need adjusting.
    if (uv && bare) {
      // Minimal example: create a bare server and attach UV handler that proxies requests.
      // The actual recommended setup uses uv.createServer(...) or uv.handler(...) — check UV docs for exact API.
      // We'll attempt a common pattern; if it fails, we log an explanatory message.

      try {
        // Example approach (best-effort; adapt if the real API differs)
        const { default: uvDefault, createHandler } = uv;
        const { default: bareDefault } = bare;

        // Many UV versions expose a factory like uv.createServer or uv.serve
        // We'll attempt to use a handler function if available, otherwise fallback.
        let handler;
        if (typeof uv.createServer === 'function') {
          const uvServer = uv.createServer({});
          handler = uvServer.requestHandler ?? uvServer.handle ?? uvServer;
        } else if (typeof uv.default === 'function') {
          handler = uv.default({}); // try default export
        } else if (typeof createHandler === 'function') {
          handler = createHandler();
        }

        if (typeof handler !== 'function') {
          console.warn('[Proxtem UV] Could not obtain handler from @tomphttp/uv automatically. You may need to update server.js with the correct API call for your installed version of UV.');
          return false;
        }

        // Mount UV handler at /service (you can change this path)
        app.use('/service', (req, res, next) => {
          // Delegate to the UV handler and gracefully fallback
          try {
            handler(req, res);
          } catch (err) {
            console.error('[Proxtem UV] handler error:', err);
            res.statusCode = 500;
            res.end('UV handler error: ' + String(err));
          }
        });

        console.log('[Proxtem UV] Ultraviolet handler mounted at /service');
        return true;
      } catch (err) {
        console.warn('[Proxtem UV] Attempt to initialize UV failed:', err && err.stack ? err.stack : err);
        return false;
      }
    }
    return false;
  } catch (err) {
    // Module not found or import error — UV not installed
    return false;
  }
}

// Fallback simple info route if UV isn't mounted.
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: '.' });
});

// If a user directly hits /uv-info show instructions
app.get('/uv-info', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.end([
    'Ultraviolet not detected or could not be initialized.',
    '',
    'To enable advanced proxying:',
    '  1. cd into this project folder',
    '  2. run: npm install',
    '  3. run: npm start',
    '',
    'If installation fails, check @tomphttp/uv and @tomphttp/bare package docs for the correct versions and APIs.'
  ].join('\n'));
});

const port = process.env.PORT || 3000;

tryMountUV().then((ok) => {
  if (!ok) {
    console.log('[Proxtem UV] Running in "info" mode. Use /uv-info for setup steps.');
  }
  app.listen(port, () => {
    console.log(`Proxtem UV scaffold running on http://localhost:${port}`);
  });
});
