const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register a new user
public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
// Check if both username and password are provided
  if (username && password) {
    // Check if the username is already taken
    if (!isValid(username)) {
      // If not, add the new user to the users object
      users[username] = { password: password };
      // Send a success message
      return res.status(200).json({ message: "User registered successfully" });
    } else {
      // If the username is taken, send an error message
      return res.status(400).json({ message: "Username already exists" });
    }
  } else {
    // If either username or password is missing, send an error message
    return res.status(400).json({ message: "Unable to register user" });
  }
});
  

//Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Send the response with formatted JSON
  res.send(JSON.stringify(books, null, 4));
  //Return the books object as a JSON response
  return res.status(300).json({message: "Yet to be implemented"});
});



/* Get the book list available in the shop with callback, promises, and async/await
let myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // Resolve the promise with the books data
    resolve(books);
  }, 3000); // 3 second delay

  myPromise.then((books) => {
    // Send the response with formatted JSON
    res.send(JSON.stringify(books, null, 4));
    // Return the books object as a JSON response
    console.log("From Callback" + books);
    return res.status(300).json({ message: "Yet to be implemented" });
  });
});
*/




// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //retrieve the ISBN from the request parameters
  const isbn = req.params.isbn;
  //Check if the book with the given ISBN exists in the books database
  if (books[isbn]) {
      //If the book exists, send its details as a JSON response
      res.send(JSON.stringify(books[isbn], null, 4));
  } else {
      //If the book does not exist, send an error message
      res.status(404).send("Book not found");
  }
  //Send the response with formatted JSON
  return res.status(300).json({message: "Yet to be implemented"});
 });


  /*Get book details based isbn with callback, promises, and async/await
  let myPromise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      // Resolve the promise with the books data
      resolve(isbn);
    }, 3000); // 3 second delay

    myPromise.then((isbn) => {
      // Send the response with formatted JSON
      res.send(JSON.stringify(isbn, null, 4));
      // Return the books object as a JSON response
      console.log("From Callback" + isbn);
      return res.status(300).json({ message: "Yet to be implemented" });
    });
  }
);
*/

  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  //Filter the books based on the author name
  const filteredBooks = Object.values(books).filter(book => book.author === author);
  //Check if any books were found for the given author
  if (filteredBooks.length > 0) {
      //If books were found, send them as a JSON response
      res.send(JSON.stringify(filteredBooks, null, 4));
  } else {
      //If no books were found, send an error message
      res.status(404).send("No books found for the given author");
  }
  //Send the response with formatted JSON
  return res.status(300).json({message: "Yet to be implemented"});
});

/* Get book details based author with callback, promises, and async/await
let myPromise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // Resolve the promise with the books data
    resolve(author);
  }, 3000); // 3 second delay

  myPromise.then((author) => {
    // Send the response with formatted JSON
    res.send(JSON.stringify(author, null, 4));
    // Return the books object as a JSON response
    console.log("From Callback" + author);
    return res.status(300).json({ message: "Yet to be implemented" });
  });
});
*/


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  //Filter the books based on the title
  const filteredBooks = Object.values(books).filter(book => book.title === title);
  //Check if any books were found for the given title
  if (filteredBooks.length > 0) {
      //If books were found, send them as a JSON response
      res.send(JSON.stringify(filteredBooks, null, 4));
  } else {
      //If no books were found, send an error message
      res.status(404).send("No books found for the given title");
  }
  //Send the response with formatted JSON
  return res.status(300).json({message: "Yet to be implemented"});
});

/*get book details based on title with callback, promises, and async/await
let myPromise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // Resolve the promise with the books data
    resolve(title);
  }, 3000); // 3 second delay

  myPromise.then((title) => {
    // Send the response with formatted JSON
    res.send(JSON.stringify(title, null, 4));
    // Return the books object as a JSON response
    console.log("From Callback" + title);
    return res.status(300).json({ message: "Yet to be implemented" });
  });
});
*/

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  //Check if the book with the given ISBN exists in the books database
  if (books[isbn]) {
      //If the book exists, send its reviews as a JSON response
      res.send(JSON.stringify(books[isbn].reviews, null, 4));
  } else {
      //If the book does not exist, send an error message
      res.status(404).send("Book not found");
  }
  //Send the response with formatted JSON
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
