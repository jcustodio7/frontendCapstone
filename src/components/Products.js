import React, { useEffect, useState } from "react";
import Header from "./Header";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatMoney } from "../utility/helper";
import dental from '../image/dental.jpg'

const Products = () => {
  // const data = [
  //   ["Joe James", "Test Corp", "Yonkers", "NY"],
  //   ["John Walsh", "Test Corp", "Hartford", "CT"],
  //   ["Bob Herm", "Test Corp", "Tampa", "FL"],
  //   ["James Houston", "Test Corp", "Dallas", "TX"],
  // ];
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const isAuthenticated = localStorage.getItem("userToken");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/login");
    }
  });

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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const options = {
    filterType: "checkbox",
    selectableRows: false,
  };

  // const columns = ["Product", "Name", "Description", "Price", "Remove"];
  const handleDelete = async (rowIndex) => {
    const rowData = data[rowIndex];
    const response = await axios.delete(
      `https://ec2-3-106-54-52.ap-southeast-2.compute.amazonaws.com/api/products/${rowData.id}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      }
    );
    console.log(response);
    fetchData();
  };
  const columns = [
    {
      name: "Product",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Product Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Product Description",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Price",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const rowData = data[rowIndex];
          return (
            <>
              {isAuthenticated ? (
                <>
                  <Button
                    variant="text"
                    color="primary"
                    startIcon={<EditIcon />}
                  >
                    <Link to={"/updateProduct/" + rowData.id}> Edit </Link>
                  </Button>
                  <Button
                    variant="text"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(rowIndex)}
                  >
                    Delete
                  </Button>
                </>
              ) : null}
            </>
          );
        },
      },
    },
  ];

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }
  return (
    <div >
      <Header />
      <div className="shopView">
      <h1>Product Lists</h1>
      <Button className="addProductButton" color="success" variant="contained">
        {" "}
        <Link
          className="addProduct"
          to="/addProduct"
          href="#home"
          style={{ textDecoration: "none" }}
        >
          ADD PRODUCT
        </Link>{" "}
      </Button>
      <MUIDataTable
        className="mui-Table"
        data={data.map((d) => {
          return [
            <img
              style={{ width: 150 }}
              // src={"http://localhost:8000/" + d.file_path}
              src={dental}
            ></img>,
            d.product_name,
            d.product_description,
            formatMoney(d.product_price),
          ];
        })}
        columns={columns}
        options={options}
      />
      </div>
    </div>
  );
};

export default Products;
