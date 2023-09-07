import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { PORT, DB_URL } from "./config.js";
import { Book } from "./models/BookModel.js";

const app = express();

//connect to db
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Database connected");
});
//middleware
app.use(cors());
app.use(express.json());

//get
app.get("/", (req, res) => {
  res.send("Hello World!");
});


// get all books
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).send(books);
    } catch (error) {
        console.log(error);
    }
});

// get a book by id
app.get("/books/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).send(book);
    } catch (error) {
        console.log(error);
    }
});


//post
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
    const book = await Book.create(newBook);
    res.status(201).send(book);
  } catch (error) {
    console.log(error);
  }
});
