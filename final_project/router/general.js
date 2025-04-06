const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  } else {
    // Check if the username already exists
    const userExists = users.some(user => user.username === username);
    if (userExists) {
      return res.status(400).json({ message: "Username already exists." });
    } else {
      // Add the new user to the users array
      users.push({ username, password });
      return res.status(200).json({ message: "User registered successfully." });
    }
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  res.send(JSON.stringify(books[isbn], null, 4));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const booksByAuthor = Object.values(books).filter(book => book.author === author);
  res.send(JSON.stringify(booksByAuthor, null, 4));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const booksByTitle = Object.values(books).filter(book => book.title === title);
  res.send(JSON.stringify(booksByTitle, null, 4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book && book.reviews) {
    res.send(JSON.stringify(book.reviews, null, 4));
  } else {
    res.status(404).send("No reviews found for this book.");
  }
});

module.exports.general = public_users;

// Using Promises to handle asynchronous operations

// Get the book list available in the shop

let allBooksPromise = new Promise((resolve, reject) => {
  resolve(books);
  }
);

allBooksPromise.then((result) => {
  console.log(result);
}).catch((error) => {
  console.error(error);
});

// Get book details based on ISBN
let bookDetailsPromise = new Promise((resolve, reject) => {
  const isbn = "1";
  if (books[isbn]) {
    resolve(books[isbn]);
  } else {
    reject("Book not found");
  }
});

bookDetailsPromise.then((result) => {
  console.log(result);
}).catch((error) => {
  console.error(error);
});

// Get book details based on author

let booksByAuthorPromise = new Promise((resolve, reject) => {
  const author = "Chinua Achebe";
  const booksByAuthor = Object.values(books).filter(book => book.author === author);
  if (booksByAuthor.length > 0) {
    resolve(booksByAuthor);
  } else {
    reject("No books found by this author");
  }
}
);

booksByAuthorPromise.then((result) => {
  console.log(result);
}).catch((error) => {
  console.error(error);
});

// Get all books based on title

let booksByTitlePromise = new Promise((resolve, reject) => {
  const title = "Things Fall Apart";
  const booksByTitle = Object.values(books).filter(book => book.title === title);
  if (booksByTitle.length > 0) {
    resolve(booksByTitle);
  } else {
    reject("No books found with this title");
  }
}
);

booksByTitlePromise.then((result) => {
  console.log(result);
}).catch((error) => {
  console.error(error);
});

const BASE_URL = 'http://localhost:5000'; // Ajusta el puerto si es diferente

// Get all books from the API asynchronously
const getAllBooks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    console.log("Book list:\n", response.data);
  } catch (error) {
    console.error("Error :", error.message);
  }
};

// Get book details by ISBN asynchronously
const getBookByISBN = async (isbn) => {
  try {
    const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
    console.log(`Book with ISBN ${isbn}:\n`, response.data);
  } catch (error) {
    console.error("Error", error.message);
  }
};

// Get books by author asynchronously
const getBooksByAuthor = async (author) => {
  try {
    const response = await axios.get(`${BASE_URL}/author/${author}`);
    console.log(`Author books "${author}":\n`, response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

// Get books by title asynchronously
const getBooksByTitle = async (title) => {
  try {
    const response = await axios.get(`${BASE_URL}/title/${title}`);
    console.log(`Books with title "${title}":\n`, response.data);
  } catch (error) {
    console.error("Error en Tarea 13:", error.message);
  }
};

// Call the functions to test them
getAllBooks();
getBookByISBN("123456789");
getBooksByAuthor("J.K. Rowling");
getBooksByTitle("Harry Potter");