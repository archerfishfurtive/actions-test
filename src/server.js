const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

app.get('/redirect', async (req, res) => {
  const { code, state } = req.query;
  try {
    const response = await axios.post(`https://api.github.com/app-manifests/${code}/conversions`);
    const appConfig = response.data;
    // Store the appConfig in your environment variables or database
    process.env.APP_ID = appConfig.id;
    process.env.PRIVATE_KEY = appConfig.pem;
    process.env.WEBHOOK_SECRET = appConfig.webhook_secret;
    res.send('GitHub App registered successfully.');
  } catch (error) {
    res.status(500).send('Error registering GitHub App.');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
