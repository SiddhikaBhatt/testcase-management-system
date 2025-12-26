import dotenv from "dotenv";
dotenv.config(); // ✅ ensures env is loaded for ALL entry points

import pkg from "pg";
const { Pool } = pkg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// 🔐 Force pg to ignore Windows PG* env vars
const url = new URL(process.env.DATABASE_URL);

const pool = new Pool({
  host: url.hostname,
  port: Number(url.port),
  user: url.username,
  password: decodeURIComponent(url.password),
  database: url.pathname.replace("/", ""),
  ssl: { rejectUnauthorized: false },
});

export default pool;
