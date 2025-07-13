import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import "../Navbar/navbar.css"
import {HiUserCircle} from "react-icons/hi"
import {GiHamburgerMenu} from "react-icons/gi"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch,useSelector } from 'react-redux'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { logoutUser } from '../../redux/apicalls';
import PersonIcon from '@mui/icons-material/Person';
import Badge from '@mui/material/Badge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



function Navbar() {
  const isAuth = useSelector(state=>state.user.isAuthentcated);
  const cartproducts = useSelector(state=>state.cart.cartproducts);
  const dispatch = useDispatch();
  const [nav2Class,setnav2Class] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  
  const handleLogout = () => {
    
    
    logoutUser(dispatch);
    
  
  }

  if(isAuth)
  {
    return (

      <div className = "Navbar">
    
      <div className="left">
          <section className="productsheader">
            <div className="title-wrapper">
                 <h1 className="sweet-title">
                  <span data-text="MEDDY">MEDDY</span>
                  <span data-text="BUDDY">BUDDY</span>
                </h1>
   
             </div>
          </section>
      </div>

       <div className="center">
        <Link  className = "center_content" to = "/">
            HOME
        </Link>
        <Link className = "center_content" to = "/products">
            SHOP
        </Link>
        


       </div>
       
      <div className="right">
          
      <div className='ontoggle'>
      <IconButton onClick={handleClick}>
      <img src = "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png" className = "right_img1"/>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to = "/profile" style={{ textDecoration: 'none',color: "black"}}>
        <MenuItem onClick={handleClose} className='menuitem'>My Profile</MenuItem>
        </Link>

        <Link to = "/myorders" style={{ textDecoration: 'none',color: "black" }}>
        <MenuItem onClick={handleClose} className='menuitem'>My Orders</MenuItem>
        </Link>
      
        <Link to = "/login" style={{ textDecoration: 'none',color: "black" }}>
        <MenuItem onClick={handleLogout} className='menuitem'>Logout</MenuItem>
        </Link>
       
       
      </Menu>
    </div>

          <Link to = "/cart">
            <Badge badgeContent = {cartproducts.length ? cartproducts.length:0} overlap="circular" color = "secondary">
            <img src = "https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.webp?s=1024x1024&w=is&k=20&c=OFQfvkU48JTYo1aehyB1kPX7sh2CjA5I66Pdmc9qxho=" className = "right_img2"/>
            </Badge>
         
          </Link>
         
         
      </div>

     

  </div>
    )
  }
  
  else
  {
    return (
      <div className = "Navbar">
    
        <div className="left">
        <section className="productsheader">
      <div className="title-wrapper">
       <h1 className="sweet-title">
      <span data-text="MEDDY">MEDDY</span>
      <span data-text="BUDDY">BUDDY</span>
    </h1>
   
    </div>
</section>
        </div>

         <div className="center">
          <Link  className = "center_content" to = "/">
              HOME
          </Link>
          <Link className = "center_content" to = "/products">
              SHOP
          </Link>
         

  
         </div>
         
        <div className="right">
            
            <Link to = "/login">
            <img src = "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png" className = "right_img1"/>
            </Link>
            <Link to = "/login">
            <img src = "https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.webp?s=1024x1024&w=is&k=20&c=OFQfvkU48JTYo1aehyB1kPX7sh2CjA5I66Pdmc9qxho=" className = "right_img2"/>
            </Link>
           
           
        </div>

       

    </div>
    )
  }
}

export default Navbar


