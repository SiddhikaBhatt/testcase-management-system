import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

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
