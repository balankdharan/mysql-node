import express from "express";
import dotenv from "dotenv";
import mysql from "mysql2";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "hello" });
});

app.get("/books", (req, res) => {
  const bookQuery = "SELECT * FROM books";
  db.query(bookQuery, (err, book) => {
    if (err) {
      console.log(err);

      return res.json(err);
    }
    return res.json(book);
  });
});
app.post("/books", (req, res) => {
  const bookQuery =
    "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(bookQuery, [values], (err, book) => {
    if (err) {
      console.log(err);

      return res.json(err);
    }
    return res.json("Book created");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const dbQuery = "DELETE FROM books WHERE id = ?";
  db.query(dbQuery, [bookId], (err, book) => {
    if (err) {
      return res.json(err);
    }
    return res.json("Book has been deleted");
  });
});
app.listen(PORT, () => {
  console.log(`Port is listening on ${PORT}`);
});
