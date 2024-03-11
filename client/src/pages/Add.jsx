import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="form">
      <h1>Add a new book</h1>
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
        Add
      </button>
    </div>
  );
};

export default Add;
