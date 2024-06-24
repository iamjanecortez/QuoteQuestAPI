const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

// Helper function to fetch data from a given URL
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.text();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};
// General quotes route
app.get('/quotes', async (req, res) => {
  try {
    const data = await fetchData('https://quotes.toscrape.com/');
    res.send(data);
  } catch (error) {
    res.status(500).send('Failed to fetch quotes');
  }
});


// Routes for specific categories
const categories = ['love', 'inspirational', 'life', 'humor', 'friendship', 'truth', 'books', 'reading'];

categories.forEach((category) => {
  app.get(`/quotes/${category}`, async (req, res) => {
    try {
      const data = await fetchData(`https://quotes.toscrape.com/tag/${category}/`);
      res.send(data);
    } catch (error) {
      res.status(500).send(`Failed to fetch ${category} quotes`);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
