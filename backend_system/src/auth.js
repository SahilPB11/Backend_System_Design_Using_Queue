import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "./database.js";

const SECRET_KEY =
  "545454874dfjshj#%^%^$%^$%^#987979$&*537458748545476jvkdnfnjeshjhfdsjlmkaldjwekjhrijioeut85764$";

export const registerUser = async(username, password)=> {
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
    username,
    hashedPassword,
  ]);
}

export const loginUser = async(username, password) =>{
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


