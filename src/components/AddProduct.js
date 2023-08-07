import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  TextField,
  formHelperTextClasses,
} from "@mui/material";
import axios from "axios";
import "./components.css";

const AddProduct = () => {
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [price, setPrice] = useState("");
  const [file, setFile] = useState("");
  const [error, setError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/login");
    }
  });

  const addProduct = async () => {
    if (!validateForm()) {
      setSubmitLoading(false);
      return;
    } else {
      // console.log(name, description, price, file);
      const formData = new FormData();
      formData.append("file_path", file);
      formData.append("product_name", data.name);
      formData.append("product_price", data.price);
      formData.append("product_description", data.description);
      let response = await axios.post(
        "https://ec2-3-106-54-52.ap-southeast-2.compute.amazonaws.com/api/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setSubmitLoading(false);
      navigate("/products");
    }
  };

  const validateForm = () => {
    if (data.name === undefined || data.name === "") {
      setError("Product Name is required!");
      return false;
    } else if (data.description === undefined || data.description === "") {
      setError("Product Description is required!");
      return false;
    } else if (data.price === undefined || data.price === "") {
      setError("Price is required!");
      return false;
    } else if (file === undefined) {
      setError("File is required!");
      return false;
    }
    return true;
  };

  return (
    <div>
      <Header />
      <div className="fontAddProduct">
        <h1>Product to add</h1>
        <br />
        <Box
          className="bodyAddProduct"
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "400px" },
            p: 2,
          }}
          noValidate
          autoComplete="off"
        >
          <div className="bodyColor">
            <div>
              {error && <Alert severity="error">{error}</Alert>}

              <TextField
                required
                id="outlined-required"
                label="Name"
                name="name"
                onChange={(e) => handleChange(e)}
                sx={{ backgroundColor: "white", borderRadius: "5px" }}
              />
            </div>
            <TextField
              required
              id="outlined-required"
              label="Description"
              name="description"
              onChange={(e) => handleChange(e)}
              sx={{ backgroundColor: "white", borderRadius: "5px" }}
            />
            <div>
              <TextField
                required
                id="outlined-required"
                label="Price"
                name="price"
                onChange={(e) => handleChange(e)}
                sx={{ backgroundColor: "white", borderRadius: "5px" }}
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-required"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <Button
              onClick={(e) => addProduct()}
              variant="contained"
              color="success"
              className="buttonAdd"
              sx={{ mt: 2, mb: 2 }}
            >
              Add
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default AddProduct;
