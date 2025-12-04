import express from 'express';
import fetch from 'node-fetch'; // required to fetch external sites

const app = express();

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: '.' });
});

// Basic proxy endpoint
app.get('/proxy', async (req, res) => {
  const target = req.query.url;

  if (!target) {
    return res.status(400).send("Error: No URL provided.");
  }

  try {
    const response = await fetch(target);
    const text = await response.text();

    // Send the fetched webpage content back to the browser
    res.send(text);
  } catch (err) {
    res.status(500).send("Proxy error: " + err.message);
  }
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Base app running on http://localhost:${port}`);
});
