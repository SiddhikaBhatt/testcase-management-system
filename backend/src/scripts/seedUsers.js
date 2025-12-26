import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import pool from "../config/db.js";

const users = [
  { name: "Admin", email: "admin@testcase.com", password: "Admin@123", role: "admin" },
  { name: "Test Lead", email: "testlead@testcase.com", password: "Lead@123", role: "test-lead" },
  { name: "Tester", email: "tester@testcase.com", password: "Tester@123", role: "tester" },
  { name: "Read Only", email: "readonly@testcase.com", password: "View@123", role: "read-only" },
];

async function seed() {
  for (const u of users) {
    const hash = await bcrypt.hash(u.password, 10);
    await pool.query(
      `INSERT INTO users (name, email, password_hash, role)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO NOTHING`,
      [u.name, u.email, hash, u.role]
    );
  }
  console.log("✅ Demo users seeded");
}

seed().then(() => process.exit());
