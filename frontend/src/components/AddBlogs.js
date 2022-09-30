import React, { useState } from "react";
import "../index.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddBlogs = () => {
  const navigate = useNavigate();
  const [Inputs, setInputs] = useState({
    title: "",
    description: "",
    imageurl: "",
  });
  const SendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/blog/add", {
        title: Inputs.title,
        description: Inputs.description,
        image: Inputs.imageurl,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Inputs);
    SendRequest()
      .then(() => navigate("/myblogs"));
  };
  return (
    <div>
      <form className="post" onSubmit={handleSubmit}>
        <h1>Post your Blog</h1>
        <h4>Title</h4>
        <input
          name="title"
          onChange={handleChange}
          value={Inputs.title}
          className="postinput"
          type="title"
        />
        <h4>Description</h4>
        <input
          name="description"
          onChange={handleChange}
          value={Inputs.description}
          className="postinput"
          type="description"
        />
        <h4>ImageURL</h4>

        <input
          name="imageurl"
          onChange={handleChange}
          value={Inputs.imageurl}
          className="postinput"
          type="ImageURL"
        />
        <button className="pobtn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBlogs;
