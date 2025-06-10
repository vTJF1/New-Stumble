const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.post('/login', (req, res) => {
  const { email, password } = req.body; // Now this should work
  // Perform login logic here
});


app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));


// API Routes
app.use('/api/venues', require('./routes/venues'));           // Venue and comments
app.use('/api/posts', require('./routes/posts'));             // Post feed & reactions


// User Routes
app.use('/users', require('./routes/users'));                 // Login / Signup etc.
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// Serve HTML Pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/sign', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sign.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/userhome', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'userhome.html'));
});

app.get('/logout', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'loggedout.html'));
});

app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'settings.html'));
});



// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Start Server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
