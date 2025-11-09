const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
  res.render('index', { title: 'Home | Portfolio' });
});

// Example additional routes (optional)
router.get('/projects', (req, res) => {
  res.render('projects', { title: 'My Projects' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Me' });
});

module.exports = router;
