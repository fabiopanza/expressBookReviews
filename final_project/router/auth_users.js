const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const session = require('express-session');
const regd_users = express.Router();

let users = {};

// Middleware for session handling
regd_users.use(session({ secret: "fingerprint", resave: true, saveUninitialized: true }))

const isValid = (username) => {
    return users.hasOwnProperty(username);
}

const authenticatedUser = (username, password) => {
    return users[username] && users[username].password === password;
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Validate Input
    if (!username || !password) {
        return res.status(400).json({ message: "Username and Password are required!" });
    }

    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT token
        const accessToken = jwt.sign({ username }, "access", { expiresIn: 60 * 60 });

        // Store access token in session
        req.session.authorization = {
            accessToken, username
        };
        return res.status(200).json({ message: " Login Successfully!" });
    } else {
        return res.status(401).json({ message: "Invalid Username or Password!" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.session.authorization.username;
// Check if the user is logged in
  if (req.session && req.session.authorization) {
    // Check if the book exists
    if (books[isbn]) {
      // Add or update the review for the book
      books[isbn].reviews[username] = review;
      return res.status(200).send("Review added/updated successfully");
    } else {
      return res.status(404).send("Book not found");
    }
  } else {
    return res.status(403).send("User not logged in");
  }
}
);

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;
  // Check if the user is logged in
  if (req.session && req.session.authorization) {
    // Check if the book exists
    if (books[isbn]) {
      // Check if the review exists
      if (books[isbn].reviews[username]) {
        // Delete the review
        delete books[isbn].reviews[username];
        return res.status(200).send("Review deleted successfully");
      } else {
        return res.status(404).send("Review not found");
      }
    } else {
      return res.status(404).send("Book not found");
    }
  } else {
    return res.status(403).send("User not logged in");
  }
}
);

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
