import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Pool } from "pg";
const pool = new Pool();

const SECRET_KEY = "your_jwt_secret_key";

async function registerUser(username, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
    username,
    hashedPassword,
  ]);
}

async function loginUser(username, password) {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  if (result.rows.length > 0) {
    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      return token;
    }
  }
  throw new Error("Invalid credentials");
}

module.exports = { registerUser, loginUser };
