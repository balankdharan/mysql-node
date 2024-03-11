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
  const handleBookDelete = async (id) => {
    try {
      await axios.delete("http://localhost:5000/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log("err", err);
    }
  };
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
            <button
              className="delete"
              onClick={() => handleBookDelete(book.id)}
            >
              Delete
            </button>
            <button className="update">
              <Link to={`/update/${book.id}`}>Update</Link>
            </button>
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
