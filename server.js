const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', async (req, res) => {
  try {
    const response = await fetch('https://quotes.toscrape.com/');
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).send('Failed to fetch quotes');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
