import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { Alert } from "@mui/material";

const Register = () => {
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      navigate("/addProduct");
    }
  });

  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("");
  // const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
  });

  const backendApi = process.env.REACT_APP_BACK_END_API

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSignUp = async () => {
    setError("");
    if (!validateForm()) {
      // console.log(formData)
      try {
        
        const response = await axios.post("http://127.0.0.1:8000/api/register",
          JSON.stringify(formData),
          { headers: { "Content-Type": "application/json" } }
        );
        console.log(response);
        const token = response.data.token;
        localStorage.setItem("userInfo", JSON.stringify(response));
        localStorage.setItem("userToken", token);
        navigate("/login");
      } catch (error) {
        console.error(error.response.data.error);
        let errorMessage = error.response.data.error;
        setError(errorMessage);
      }
    }
  };

  const validateForm = () => {
    if (formData.name === undefined || formData.name === "") {
      setError("Name is required!");
      return false;
    } else if (formData.email === undefined || formData.email === "") {
      setError("Email is required!");
      return false;
    } else if (formData.password === undefined || formData.password === "") {
      setError("Password is required!");
      return false;
    }
  };

  return (
    <>
      <Header />
      <div className="body-login">
        <div className="col-sm-4 offset-sm-4 wrapper">
          <h1><b>REGISTRATION</b></h1>
          <div>{error && <Alert severity="error">{error}</Alert>}</div>
          <br />
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange(e)}
            className="form-control"
            placeholder="name"
          />
          <br />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange(e)}
            className="form-control"
            placeholder="password"
          />
          <br />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
            className="form-control"
            placeholder="email"
          />
          <br />
          <button onClick={(e) => handleSignUp(e)} className="login-button">
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default Register;
