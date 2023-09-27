import React, { Fragment, useState } from "react";
import "../../Navbar/navbar.css"
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

function Useroptions({user}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
       /* {
          icon: (
            <ShoppingCartIcon
              style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
            />
          ),
          name: `Cart(${cartItems.length})`,
          func: cart,
        }*/

       
      ];
    
      if (user.role === "admin") {
        options.unshift({
          icon: <DashboardIcon />,
          name: "Dashboard",
          func: dashboard,
        });
      }
    
      function dashboard() {
       navigate("/admin/dashboard")
      }
    
      function orders() {
       navigate('/orders')
      }
      function account() {
       navigate("/myprofile")
      }
      /*function cart() {
        history.push("/cart");
      }*/
      function logoutUser() {
       // dispatch(logout());
        
      }
    
  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src="https://img.freepik.com/free-icon/user_318-159711.jpg"
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  )
}

export default Useroptions