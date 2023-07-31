import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { formatMoney } from "../utility/helper";
import { Button } from "@mui/material";
import "./components.css";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import "./components.css";
import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import logo from "./img/logo.png";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";


const drawerWidth = 240;
const navItems = ["Home", "About"];

const Signup = (props) => {

    useEffect(() => {
        if (localStorage.getItem("customerToken")) {
          navigate("/Home");
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
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const navigate = useNavigate();
    
      const handleSignUp = async () => {
        setError("");
        if (!validateForm()) {
          // console.log(formData)
          try {
            const response = await axios.post(
              "https://ec2-3-106-54-52.ap-southeast-2.compute.amazonaws.com/api/signup",
              JSON.stringify(formData),
              { headers: { "Content-Type": "application/json" } }
            );
            console.log(response);
            const token = response.data.token;
            localStorage.setItem("customerInfo", JSON.stringify(response));
            localStorage.setItem("customerToken", token);
            navigate("/Home");
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
      
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      Navigate("/login");
    }
  });
  const isAuthenticated = localStorage.getItem("userToken");

  const style = {
    position: "absolute",
    overflow: "scroll",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "75%",
    width: "50%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    display: "block",
    p: 4,
  };

  //   const modalStyle = {
  //     position:'absolute',
  //     top:'10%',
  //     left:'10%',
  //     overflow:'hidden',
  //     height:'100%',
  //     display:'block'
  //   }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://ec2-3-106-54-52.ap-southeast-2.compute.amazonaws.com/api/products", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      });
      let products = response.data.products;

      console.log(products);
      setData(products);
    } catch (error) {
      console.log(error);
    }
  };
  const [filterItem, setfilterItem] = useState("");
  const searchText = (event) => {
    setfilterItem(event.target.value);
  };
  const dataItemSearch = data.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filterItem.toString().toLowerCase())
    );
  });

  const handleAddProduct = (product) => {
    const ProductExists = cartItems.find((item) => item.id === product.id);
    if (ProductExists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...ProductExists, quantity: ProductExists.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    console.log(cartItems);
  };

  const handleRemoveProduct = (product) => {
    const ProductExists = cartItems.find((item) => item.id === product.id);
    if (ProductExists.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...ProductExists, quantity: ProductExists.quantity - 1 }
            : item
        )
      );
    }
  };

  const totalPrice = cartItems.reduce(
    (price, item) => price + item.quantity * item.product_price,
    0
  );

  const handleCartClearance = () => {
    setCartItems([]);
  };
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar sx={{ backgroundColor: "black" }} component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <img
                style={{ width: 50, height: 50 }}
                src={logo}
                alt="react logo"
              ></img>{" "}
              &nbsp; Online Dental Store
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: "#fff" }}>
                  <Link
                    to={`/${item}`}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {item}
                  </Link>
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ p: 3, height: "100vh" }}>
          <Toolbar />
          <br />
        <div className="signUp">
          <h1><b>SIGN UP</b></h1>
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
        </Box>
      </Box>
      {/* <Header /> */}
    </div>
  );
};

export default Signup;
