const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mockDB = require("../mockDB.json");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const fs = require("fs");
const mockDBFilePath = "./mockDB.json";

function updateUserDatabase(users) {
  fs.writeFile(mockDBFilePath, JSON.stringify({ users }), (err) => {
    if (err) {
      console.error("Error updating user database file:", err);
    } else {
      console.log("User database file updated successfully");
    }
  });
}

dotenv.config();

const router = express.Router();

// Example user database (for demonstration purposes)
const users = mockDB.users;
//console.log(users.find(u => u.email == "deni"))

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );
    res.json({
      user: {
        token: token,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
      },
      success: true,
    });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

router.get("/init_user_data", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token: ", token);
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    console.log("decoded: ", decoded);
    // Attach user object to request for further processing
    req.user = decoded;
    res.json({ user: decoded });
  });
});

// Register route
router.post("/register", (req, res) => {
  const { firstname, lastname, email, username, password } = req.body;
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const newUser = { id: users.length + 1, firstname, lastname, email, username, password };
  users.push(newUser);
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email },
    process.env.JWT_SECRET
  );
  updateUserDatabase(users);
  res.status(201).json({
    message: "User created successfully",
    user: {
      token: token,
      email: newUser.email,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      username: newUser.username,
    },
    success: true,
  });
});

// Authentication middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token: ", token);
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    console.log("decoded: ", decoded);
    // Attach user object to request for further processing
    req.user = decoded;
    next();
  });
}

module.exports = { router, authenticate };
