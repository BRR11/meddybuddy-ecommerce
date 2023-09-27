import React from "react"
import Navbar from "./component/Navbar/Navbar"
import { useEffect } from "react"
import Footer from  "./component/Footer/Footer"
import { BrowserRouter,Routes,Route} from "react-router-dom"
import Section1 from "./component/section1/Section1"
import Home from "./pages/Home/Home"
import Productdetails from "./pages/productdetails/Productdetails"
import Products from "./pages/products/Products.jsx"
import Login from "./pages/Login/Login.jsx"
import Register from "./pages/Register/Register.jsx"
import { loadUser } from "./redux/apicalls"
import { useDispatch,useSelector } from "react-redux"
import Useroptions from "./component/Navbar/userOptions/Useroptions"
import Profile from "./pages/profile/Profile.jsx"
import Updateprofile from "./pages/profile/Updateprofile"
import Cart from "./pages/cart/Cart.jsx"
import Shippingaddress from "./pages/shipping/Shippingaddress"
import Placeorder from "./pages/orders/Placeorder"
import Paymentsuccessfull from "./pages/orders/Paymentsuccessfull"
import Myorders from "./pages/orders/Myorders"
import Sidebar from "./component/Sidebar/Sidebar"

function App() {
 
  const dispatch = useDispatch();
  const { isAuthentcated, user } = useSelector((state) => state.user);
  useEffect(() => {
    loadUser(dispatch);
  
    
  }, [user])

  
  
  
  return (
    
   <BrowserRouter>
         <Routes>
         
          <Route element = {isAuthentcated && <Useroptions user={user} />} />

       
          
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/products" element = {<Products/>}/>
          <Route path = "/product/:id" element = {<Productdetails/>}/>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/register" element = {<Register/>}/>
          <Route path = "/profile" element = {<Profile/>}/>
          <Route path = "/updateprofile" element = {<Updateprofile/>}/>
          <Route path = "/cart" element = {<Cart/>}/>
          <Route path = "/shippingaddress" element = {<Shippingaddress/>}/>
          <Route path = "/confirmorder" element = {<Placeorder/>}/>
          <Route path = '/ordersuccessfull' element = {<Paymentsuccessfull/>}/>
          <Route path = "/myorders" element = {<Myorders/>}/>
         
          <Route path = "/sidebar" element = {<Sidebar/>}/>
         </Routes>
         
   </BrowserRouter>

      

    
  );
}

export default App;
