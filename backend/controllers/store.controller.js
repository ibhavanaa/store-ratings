const db = require('../db');

exports.createStore = async (req, res) => {
  const { name, email, address, owner_id } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)`,
      [name, email, address, owner_id]
    );
    res.status(201).json({ message: 'Store created', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllStores = async (req, res) => {
  try {
    const [stores] = await db.query(`SELECT s.*, u.name AS owner_name FROM stores s LEFT JOIN users u ON s.owner_id = u.id`);
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRatingsByOwner = async (req, res) => {
  try {
    const [ratings] = await db.query(
      `SELECT r.rating_value, u.name AS user FROM ratings r
       JOIN users u ON r.user_id = u.id
       JOIN stores s ON r.store_id = s.id
       WHERE s.owner_id = ?`,
      [req.user.id]
    );
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTopRatedStores = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT s.id, s.name, AVG(r.rating_value) AS average_rating
       FROM stores s
       JOIN ratings r ON s.id = r.store_id
       GROUP BY s.id
       ORDER BY average_rating DESC
       LIMIT 10`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};