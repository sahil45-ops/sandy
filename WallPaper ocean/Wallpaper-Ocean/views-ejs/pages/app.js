
const express = require('express');
const path = require('path');

const app = express();

// EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views-ejs'));

// Routes
app.get('/', (req, res) => res.render('pages/cover', { title: 'Cover Page' })); // Default route
app.get('/cover', (req, res) => res.render('pages/cover', { title: 'Cover Page' }));
app.get('/login', (req, res) => res.render('pages/login', { title: 'Login Page' }));
app.get('/signup', (req, res) => res.render('pages/signup', { title: 'Signup Page' }));

// Set public folder for static files
app.use(express.static(path.join(__dirname, 'public')));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
