const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all habits for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const [habits] = await db.query(
      'SELECT * FROM habits WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    res.json(habits);
  } catch (error) {
    console.error('Get habits error:', error);
    res.status(500).json({ error: 'Failed to fetch habits', details: error.message });
  }
});

// Create a new habit
router.post('/', async (req, res) => {
  try {
    const { userId, title, description, category } = req.body;

    if (!userId || !title) {
      return res.status(400).json({ error: 'User ID and title are required' });
    }

    const [result] = await db.query(
      'INSERT INTO habits (user_id, title, description, category, streak) VALUES (?, ?, ?, ?, ?)',
      [userId, title, description || '', category || '', 0]
    );

    res.status(201).json({
      message: 'Habit created successfully',
      habitId: result.insertId
    });
  } catch (error) {
    console.error('Create habit error:', error);
    res.status(500).json({ error: 'Failed to create habit', details: error.message });
  }
});

// Update a habit
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, streak } = req.body;

    const [result] = await db.query(
      'UPDATE habits SET title = ?, description = ?, category = ?, streak = ? WHERE id = ?',
      [title, description, category, streak || 0, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    res.json({ message: 'Habit updated successfully' });
  } catch (error) {
    console.error('Update habit error:', error);
    res.status(500).json({ error: 'Failed to update habit', details: error.message });
  }
});

// Delete a habit
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query('DELETE FROM habits WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    res.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    console.error('Delete habit error:', error);
    res.status(500).json({ error: 'Failed to delete habit', details: error.message });
  }
});

module.exports = router;
