import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { PORT, DB_URL } from "./config.js"; // Import configuration variables
import { Book } from "./models/BookModel.js"; // Import the Book model

const app = express();

// Connect to the database
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Start the server after successfully connecting to the database
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });

const db = mongoose.connection;

// Database connection error handling
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => {
  console.log("Database connected");
});

// Middleware
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Parse incoming JSON data

// Route to the root of the application
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({}); // Find all books in the database
    res.status(200).send(books); // Respond with a status of 200 (OK) and send the list of books
  } catch (error) {
    console.log(error);
  }
});

// Get a book by its ID
app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id); // Find a book by its ID
    res.status(200).send(book); // Respond with a status of 200 (OK) and send the book data
  } catch (error) {
    console.log(error);
  }
});

// Update a book by its ID
app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(400).send("Please fill all the fields");
    }
    const result = await Book.findByIdAndUpdate(req.params.id, req.body); // Update the book by its ID
    if (!result) {
      res.status(400).send("Book not found");
    }
    res.status(200).send("Book updated successfully");
  } catch (error) {
    console.log(error);
  }
});

// Create a new book
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(400).send("Please fill all the fields");
    }
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    });
    const book = await Book.create(newBook); // Create a new book in the database
    res.status(201).send(book); // Respond with a status of 201 (Created) and send the created book
  } catch (error) {
    console.log(error);
  }
});

// Delete a book by its ID
app.delete("/books/:id", async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id); // Find and delete a book by its ID
    if (!result) {
      res.status(400).send("Book not found");
    }
    res.status(200).send("Book deleted successfully");
  } catch (error) {
    console.log(error);
  }
});
