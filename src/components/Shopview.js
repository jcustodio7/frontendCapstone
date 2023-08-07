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
import dental from "../image/dental.jpg";

const Shopview = () => {
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
      const response = await axios.get(
        "https://ec2-3-106-54-52.ap-southeast-2.compute.amazonaws.com/api/products",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        }
      );
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
      <Header />
      <div className="shopView1">
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
                          // src={"http://localhost:8000/" + item.file_path}
                          src={dental}
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
                  // src={"http://localhost:8000/" + d.file_path}
                  src={dental}
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

export default Shopview;
