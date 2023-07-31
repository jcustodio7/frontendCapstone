import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Box, Button, TextField } from "@mui/material";
import axios from "axios";
import dental from '../image/dental.jpg'

const UpdateProduct = () => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/login");
    }
  });
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      console.log(params.id);
      const result = await axios.get(
        `https://ec2-3-106-54-52.ap-southeast-2.compute.amazonaws.com/api/products/${params.id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        }
      );
      const productName = result.data.products;
      setData(productName);
      setName(data.product_name);
      setDescription(data.product_description);
      setPrice(data.product_price);
      setFile(data.file_path);
      console.log(result);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSave = async (id) => {
    console.log(!validateForm());
    if (!validateForm()) {
      setLoading(false);
      return;
    } else {
      const formData = new FormData();
      formData.append("file_path", file);
      formData.append("product_name", name);
      formData.append("product_price", price);
      formData.append("product_description", description);
      let response = await axios.post(
        "https://ec2-3-106-54-52.ap-southeast-2.compute.amazonaws.com/api/updateProducts/" + id + "?_method=PUT",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      navigate("/products");
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (name === undefined || name === "") {
      setError("Product Name is required!");
      return false;
    } else if (description === undefined || description === "") {
      setError("Product Description is required!");
      return false;
    } else if (price === undefined || price === "") {
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
        <h1>Update here</h1>

        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "400px" },
            p: 2,
          }}
          className="bodyAddProduct"
          noValidate
          autoComplete="off"
        >
          <div className="bodyColor">
            <div>
              {error && <Alert severity="error">{error}</Alert>}

              <TextField
                type="text"
                id="outlined-required"
                // loading={loading}
                onChange={(e) => setName(e.target.value)}
                label={data.product_name}
                sx={{ backgroundColor: "white", borderRadius: "5px" }}
              />
            </div>
            <TextField
              required
              id="outlined-required"
              onChange={(e) => setDescription(e.target.value)}
              label={data.product_description}
              sx={{ backgroundColor: "white", borderRadius: "5px" }}
            />
            <div>
              <TextField
                required
                id="outlined-required"
                onChange={(e) => setPrice(e.target.value)}
                label={data.product_price}
                sx={{ backgroundColor: "white", borderRadius: "5px" }}
              />
            </div>
            <div>
              <TextField
                required
                onChange={(e) => setFile(e.target.files[0])}
                id="outlined-required"
                type="file"
              />
            </div>
            <br />
            <div>
              <img
                style={{ width: 200 }}
                src={"http://localhost:8000/" + data.file_path}
                // src={dental}
              ></img>
            </div>
            <br />
            <Button
              onClick={(e) => handleSave(data.id)}
              variant="contained"
              color="success"
            >
              Save
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default UpdateProduct;
