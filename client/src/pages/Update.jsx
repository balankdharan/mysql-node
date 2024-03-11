import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5000/books/" + bookId, book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="form">
      <h1>Update book</h1>
      <input
        onChange={handleChange}
        type="text"
        name="title"
        id="title"
        placeholder="Title of book"
      />
      <textarea
        onChange={handleChange}
        name="desc"
        id="desc"
        placeholder="Enter description"
      />
      <input
        onChange={handleChange}
        type="number"
        name="price"
        id="price"
        placeholder="Price of book"
      />
      <input
        onChange={handleChange}
        type="text"
        name="cover"
        id="cover"
        placeholder="cover of book"
      />
      <button className="formButton" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};

export default Update;
