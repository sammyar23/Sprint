const express = require('express');
const path = require('path');
const app = express();

const port = 3000;

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src', 'views'));

// Define routes for your pages
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/population', (req, res) => {
  res.render('population');
});

app.get('/aboutus', (req, res) => {
  res.render('aboutus');
});

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
