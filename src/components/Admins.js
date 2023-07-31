import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import MUIDataTable from "mui-datatables";
import axios from "axios";
import { Button } from "@mui/material";

const Admins = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/login");
    }
  });
  //     const data = [
  //   ["Joe James", "Test Corp", "Yonkers", "NY"],
  //   ["John Walsh", "Test Corp", "Hartford", "CT"],
  //   ["Bob Herm", "Test Corp", "Tampa", "FL"],
  //   ["James Houston", "Test Corp", "Dallas", "TX"],
  // ];

  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = async (rowIndex) => {
    const rowData = data[rowIndex];
    const response = await axios.delete(
      `https://ec2-3-106-54-52.ap-southeast-2.compute.amazonaws.com/api/deleteCustomers/${rowData.id}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      }
    );
    console.log(response);
    fetchData();
  };
  const fetchData = async () => {
    try {
      const response = await axios.get("https://ec2-3-106-54-52.ap-southeast-2.compute.amazonaws.com/api/customers", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      });
      let users = response.data.users;
      console.log(users);
      setData(users);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      name: "Admin Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Admin Email",
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
              <Button
                variant="text"
                color="error"
                onClick={() => handleDelete(rowIndex)}
              >
                Delete
              </Button>
            </>
          );
        },
      },
    },
  ];
  const options = {
    filterType: "checkbox",
    selectableRows: false,
  };
  return (
    <div className="adminClass">
      <Header />
      <h1>Admin List</h1>
      <MUIDataTable
        className="mui-TableAdmin"
        data={data.map((d) => {
          return [d.name, d.email];
        })}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default Admins;
