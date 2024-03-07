import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Books = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/books");
        console.log("res", res);
        setBooks(res.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchAllBooks();
  }, []);
  return (
    <div>
      <h1>Book lib</h1>
      <div className="books">
        {books.map((book, index) => (
          <div className="book" key={index}>
            {book.cover && <img src={book.cover} alt={book.title} />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
          </div>
        ))}
      </div>
      <button>
        <Link to="/add">Add a new Book</Link>
      </button>
    </div>
  );
};

export default Books;
