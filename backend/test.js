const db = require('./db');

(async () => {
  try {
    const [rows] = await db.query('SELECT NOW() AS now');
    console.log('✅ Connected! Server time:', rows[0].now);
  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
})();
