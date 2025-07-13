import React from 'react'
import "../orders/ordertable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { myOrders } from '../../redux/apicalls';


const OrderTable = ({title}) => {
 

 const dispatch = useDispatch();
 const user = useSelector(state => state.user.user);
 

   
  myOrders(dispatch);

const orders = useSelector(state => state.myorders.myorders);


   




 


  const actionColumns = [
    {
      field: "view",
      headerName: "View",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to= {`/order/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            
          </div>
        );
      },
    },
    
   

  ];

  const userColumns = [
    { field: "_id", headerName: "Order ID", width: 200 },
    {
      field: "totalPrice",
      headerName: "Total Amount (₹)",
      width: 250,

    
      
    },
    
    {
         
      field: "orderStatus",
      headerName: "Order Status",
      width: 140,
    },

    {
        field: "createdAt",
      headerName: "Order on",
      width: 200,
      valueGetter: (params) => {
        const date = new Date(params.value); // Convert to date object
        return date.toLocaleDateString();    // Convert to string format: MM/DD/YYYY
    }
    },

  ];

    
  return (
    <div className="datatable">
      <div className="datatableTitle">
       <span>My Orders</span>
      </div>
      <DataGrid
        className="datagrid"
        rows={orders}
        columns={userColumns.concat(actionColumns)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) => row._id}
        
      />
    </div>
  );
};

export default OrderTable;