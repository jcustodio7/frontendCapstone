import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { Alert } from "@mui/material";
import "./components.css";
import logo from './img/logo.png'
const Login = () => {
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      navigate("/products");
    }
  });

  //   const navigate = useNavigate()
  //   const [formData, setFormData] = useState({
  //     password: '',
  //     email: '',
  // });

  //   const handleLogin = async () => {
  //     const response = await axios.post('http://127.0.0.1:8000/api/login', formData)
  //     console.log(response)
  //     const token = response.data.token;
  //     localStorage.setItem('userToken', token);
  //       navigate('/addProduct');
  // }

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitLoading(true);

    if (!validateForm()) {
      setSubmitLoading(false);
      return;
    } else {
      try {
        const response = await axios.post(
          "https://ec2-3-106-54-52.ap-southeast-2.compute.amazonaws.com/api/login",
          formData
        );
        const token = response.data.token;
        console.log(response);
        localStorage.setItem("userToken", token);
        localStorage.setItem("userInfo", JSON.stringify(response));
        navigate("/products");
        console.log(response);
      } catch (error) {
        let errorMessage = error.response.data.error;
        setError(errorMessage);
        console.error(errorMessage);
      }
      setSubmitLoading(false);
    }
  };

  const validateForm = () => {
    if (formData.email === undefined || formData.email === "") {
      setError("Email is required!");
      return false;
    } else if (formData.password === undefined || formData.password === "") {
      setError("Password is required!");
      return false;
    }

    return true;
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <Header />
      <div className="body-login">
        <div className="col-sm-4 offset-sm-4 wrapper">
        <img style={{width: 250, height:150}} src={logo} alt='react logo'></img>

          <div> {error && <Alert severity="error">{error}</Alert>} </div>
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
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange(e)}
            className="form-control"
            placeholder="password"
          />
          <br />
          <button onClick={(e) => handleLogin(e)} className="login-button">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
