// routes/index.js
import express from "express";
const router = express.Router();
import distributeUsers from "../services/flowdistribution.js";
import Astrologer from "../models/astrologer.js";
import User from "../models/user.js";

// Sample data
let astrologers = [
  new Astrologer(1, "Astrologer 1"),
  new Astrologer(2, "Astrologer 2"),
  new Astrologer(3, "Astrologer 3"),
];

let users = [
  new User(1, "User 1"),
  new User(2, "User 2"),
  new User(3, "User 3"),
  new User(4, "User 4"),
  new User(5, "User 5"),
];

// Route to distribute users among astrologers
router.post("/distribute", (req, res) => {
  try {
    // Distribute users
    astrologers = distributeUsers(users, astrologers);
    res.json({ message: "Users distributed successfully", astrologers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to distribute users", error: error.message });
  }
});

export default router;
