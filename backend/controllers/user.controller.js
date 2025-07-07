const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { name, email, password, role, address } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      `INSERT INTO users (name, email, password, role, address) VALUES (?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, role, address]
    );
    res.status(201).json({ message: 'User created', id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
    const user = rows[0];
    if (!user) return res.status(404).json({ error: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query(`SELECT id, name, email, role FROM users`);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};