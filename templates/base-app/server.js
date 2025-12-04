import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: '.' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Base app running on http://localhost:${port}`);
});
