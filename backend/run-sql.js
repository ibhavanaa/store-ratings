const db = require('./db');

const queries = [
  `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address TEXT,
    role ENUM('ADMIN', 'USER', 'OWNER') NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS stores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150),
    address TEXT,
    owner_id INT,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
  )`,
  `CREATE TABLE IF NOT EXISTS ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    store_id INT NOT NULL,
    rating_value INT CHECK (rating_value BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, store_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
  )`
];

(async () => {
  try {
    for (const query of queries) {
      await db.query(query);
    }
    console.log('✅ Tables created successfully');
    process.exit(0);
  } catch (err) {
    console.error('❌ Table creation failed:', err.message);
    process.exit(1);
  }
})();
