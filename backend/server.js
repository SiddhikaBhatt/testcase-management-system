import dotenv from "dotenv";
dotenv.config(); // ✅ load env globally ONCE

import app from "./src/app.js";
import pool from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

try {
  await pool.query("SELECT 1");
  console.log("✅ DB connected successfully");
} catch (err) {
  console.error("❌ DB connection failed:", err.message);
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
