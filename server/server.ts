const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Tech Store API');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
