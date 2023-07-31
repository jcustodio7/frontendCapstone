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

const drawerWidth = 240;
const navItems = ["Home", "About"];
const backendApi = process.env.REACT_APP_BACKEND_API
const ShopStore = (props) => {
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
      const response = await axios.get("http://127.0.0.1:8000/api/products", {
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
  const navigate = useNavigate();

  const handleLogout = (e) => {
    localStorage.removeItem("customerToken");
    navigate("/Home");
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
              {isAuthenticated ? (
                <>
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
          <Typography
            variant="h5"
            style={{
              textAlign: "center",
              marginTop: "50px",
            }}
          >
            ABOUT US
          </Typography>
          <Divider className="divider" />
          <br />
          <Typography
            variant="h5"
            style={{
              textAlign: "center",
              marginTop: "50px",
              width: "50%",
              margin: "auto",
            }}
          >
            This dental shop was established during the pandemic lockdown season
            when the dental industry has experienced a shortage in equipments
            and consumables in their own dental clinics. With that, a group of
            dentist decided to establish a business wherein they will sell a
            dental equipments in a friendly price and would sell it to their
            loyal clients
          </Typography>
          <Divider className="divider" />
          <br />
          <Typography
            variant="h5"
            style={{
              textAlign: "center",
              marginTop: "75px",
              width: "50%",
              margin: "auto",
            }}
          >
            It is also operated by a group of dentist who also runs a their own
            dental clinics around Metro Manila. As of now this Online Dental
            shop is currently supplying 20 dental clinics around metro manila
            for their equipments, instruments and dental consumables
          </Typography>
          <Divider className="divider" />
        </Box>
      </Box>
      {/* <Header /> */}
    </div>
  );
};

export default ShopStore;
