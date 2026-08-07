const express = require('express');
const pool = require('../db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  const userId = req.user?.userId;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized access.' });
  }

  try {
    const result = await pool.query(
      'SELECT items FROM user_carts WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      await pool.query(
        'INSERT INTO user_carts (user_id, items) VALUES ($1, $2)',
        [userId, JSON.stringify([])]
      );
      return res.status(200).json({ items: [] });
    }

    return res.status(200).json({ items: result.rows[0].items || [] });
  } catch (err) {
    console.error('Fetch cart error:', err.message);
    return res.status(500).json({ error: 'Unable to load cart data.' });
  }
});

router.put('/', authenticateToken, async (req, res) => {
  const userId = req.user?.userId;
  const { items } = req.body;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized access.' });
  }
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'Invalid cart payload.' });
  }

  try {
    const result = await pool.query(
      'SELECT id FROM user_carts WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      await pool.query(
        'INSERT INTO user_carts (user_id, items) VALUES ($1, $2)',
        [userId, JSON.stringify(items)]
      );
    } else {
      await pool.query(
        'UPDATE user_carts SET items = $1, updated_at = NOW() WHERE user_id = $2',
        [JSON.stringify(items), userId]
      );
    }

    return res.status(200).json({ items });
  } catch (err) {
    console.error('Save cart error:', err.message);
    return res.status(500).json({ error: 'Unable to save cart data.' });
  }
});

module.exports = router;
