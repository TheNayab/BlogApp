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
  const SendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:5000/user/${type}`, {
        name: Inputs.name,
        email: Inputs.email,
        password: Inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
   
      SendRequest()
        .then((data) => localStorage.setItem("userId", data.result._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"));
    
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
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
