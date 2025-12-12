const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const authRoutes = require('./routes/auth');
const habitRoutes = require('./routes/habits');
const contactRoutes = require('./routes/contact');


app.use('/api/auth', authRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/contact', contactRoutes);


app.get('/api/test', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.json({ message: 'Database connected successfully', result: rows[0].result });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed', details: error.message });
  }
});


app.get('/', (req, res) => {
  res.json({ message: 'HabitFlow API is running' });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
