const db = require('../db');

exports.rateStore = async (req, res) => {
  const { rating_value } = req.body;
  const { storeId } = req.params;
  try {
    await db.query(
      `INSERT INTO ratings (user_id, store_id, rating_value)
       VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating_value = ?`,
      [req.user.id, storeId, rating_value, rating_value]
    );
    res.json({ message: 'Rating submitted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};