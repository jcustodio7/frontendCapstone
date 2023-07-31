import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatMoney } from "../utility/helper";
import {
  Button,
} from "@mui/material";
import "./components.css";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import "./components.css";
import { Link, useNavigate } from "react-router-dom";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dental from '../image/dental.jpg'


const drawerWidth = 240;
const navItems = ["Home", "About"];

const ShopStore = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

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
      navigate("/login");
    }
  });
  const isAuthenticated = localStorage.getItem("customerToken");

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

  const handleLogout = (e) => {
    localStorage.removeItem("customerToken");
    navigate("/Home");
    toast.success("Successfully logged out", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  let userName = JSON.parse(localStorage.getItem("customerInfo"));

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
              <Button sx={{ color: "#fff" }}>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  DASHBOARD &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Link>
              </Button>
              {isAuthenticated ? (
                <>
                  <Button
                    sx={{ color: "#fff" }}
                    onClick={(e) => handleLogout()}
                  >
                    {userName && userName.data.user.name}
                  </Button>
                  <Button
                    sx={{ color: "#fff" }}
                    onClick={(e) => handleLogout()}
                  >
                    LOGOUT
                  </Button>
                </>
              ) : (
                <>
                  <Button sx={{ color: "#fff" }}>
                    <Link
                      to="/LoginCustomer"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      LOGIN IN
                    </Link>
                  </Button>
                  <Button sx={{ color: "#fff" }}>
                    <Link
                      to="/Signup"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      SIGN UP
                    </Link>
                  </Button>
                </>
              )}
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              {/* Same as */}
              <ToastContainer />
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
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
        </Box>
      </Box>
      {/* <Header /> */}
      <div>
        <input
          className="inputSearch"
          type="text"
          value={filterItem}
          placeholder=" Search here ... "
          onChange={searchText.bind(this)}
        />
        <span className="cartIcon">
          <Button onClick={handleOpen}>
            <ShoppingCartSharpIcon sx={{ color: "black" }} />{" "}
            <span className="cart-length">
              {cartItems.length === 0 ? " " : cartItems.length}
            </span>
          </Button>
          <Modal
            // sx = {modalStyle}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Cart Lists
              </Typography>
              <div id="modal-modal-description" sx={{ mt: 2 }}>
                <div className="cart-items">
                  <div className="clear-cart">
                    {cartItems.length >= 1 && (
                      <Button
                        onClick={handleCartClearance}
                        variant="text"
                        color="primary"
                        startIcon={<ClearIcon />}
                      >
                        Clear Cart
                      </Button>
                    )}
                  </div>
                  {cartItems.length === 0 && (
                    <div className="cart-items-empty">No items are added</div>
                  )}
                  <div>
                    {cartItems.map((item) => (
                      <div key={item.id} className="cart-items-list">
                        <img
                          style={{ width: 150 }}
                          className="cart-items-image"
                          src={"http://localhost:8000/" + item.file_path}
                          // src={dental}
                          alt={item.name}
                        />
                        <div className="cart-items-name">
                          {" "}
                          {item.product_name}
                        </div>
                        <span>
                          <Button
                            className="cart-items-add"
                            variant="text"
                            color="success"
                            startIcon={<AddIcon />}
                            onClick={() => handleAddProduct(item)}
                          ></Button>
                          <Button
                            className="cart-items-remove"
                            variant="text"
                            color="error"
                            startIcon={<RemoveIcon />}
                            onClick={() => handleRemoveProduct(item)}
                          ></Button>
                        </span>
                        <div className="cart-items-price">
                          {" "}
                          {item.quantity} * {formatMoney(item.product_price)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="cart-items-total-price-name">
                    <b>TOTAL PRICE:</b>
                    <div className="cart-items-total-price">
                      {formatMoney(totalPrice)}
                    </div>
                    <Button
                      sx={{
                        marginTop: 5,
                      }}
                    >
                      Proceed to checkout
                    </Button>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </span>
        <span className="cart-length"></span>
        <div className="productsJ">
          {dataItemSearch.map((d) => (
            <div className="cardJ" key={d.id}>
              <div>
                <img
                  className="product-image"
                  style={{ width: 250, height: 200 }}
                  src={"http://localhost:8000/" + d.file_path}
                  // src={dental}
                  alt={d.file_path}
                />
              </div>
              <div>
                <h3 className="product-name">{d.product_name}</h3>
              </div>
              <div>
                <h3 className="product-price">
                  {formatMoney(d.product_price)}
                </h3>
              </div>
              <div>
                <button
                  onClick={() => handleAddProduct(d)}
                  variant="text"
                  className="product-addCart"
                  color="primary"
                  disabled={isAuthenticated ? false : true}
                >
                  {" "}
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopStore;
