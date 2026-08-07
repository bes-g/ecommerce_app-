require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.connect()
  .then(async (client) => {
    console.log('✅ Connected to Postgres database:', process.env.DB_NAME);

    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS user_carts (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          items JSONB NOT NULL DEFAULT '[]',
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);
      console.log('✅ Database schema verified.');
    } catch (schemaErr) {
      console.error('❌ Failed to verify schema:', schemaErr.message);
    } finally {
      client.release();
    }
  })
  .catch((err) => {
    console.error('❌ Failed to connect to Postgres:', err.message);
  });

module.exports = pool;