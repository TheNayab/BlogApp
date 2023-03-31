import React, { useState } from "react";
import "../index.css";
import axios from "axios";
import { authActions } from "../store/index";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const SendRequest = async () => {
    const res = await axios
      .post(`http://localhost:5000/user/signup`, {
        name: Inputs.name,
        email: Inputs.email,
        password: Inputs.password,
      })
      .catch((err) => alert("Email Already Exist"));

    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    SendRequest()
      .then(() => navigate("/auth"));
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Signup</h1>

        <input
          className="input"
          name="name"
          onChange={handleChange}
          value={Inputs.name}
          type="name"
          placeholder="Name"
        />

        <input
          className="input"
          name="email"
          onChange={handleChange}
          value={Inputs.email}
          type="Email"
          placeholder="Email"
        />
        <input
          className="input"
          name="password"
          onChange={handleChange}
          value={Inputs.password}
          type="Password"
          placeholder="Password"
        />
        <button type="submit" className="fbtn1">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Auth;
