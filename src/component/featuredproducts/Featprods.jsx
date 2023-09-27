import React from 'react'
import "../featuredproducts/featprod.scss"
import Productcard from '../productcard/Productcard'
import { getAllProducts } from '../../redux/apicalls'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector'
import { useDispatch } from 'react-redux'
import { useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
const categories = ["protein and vitamins","Diabetes","Healthcare Devices","Personal Care","Ayurveda Products","Homeopathy","Covid Essentials"]
function Featprods() {

  const dispatch = useDispatch();
  
  const {isFetching,error,products} = useSelector((state) => state.products);
  const category = "";
  const [keyword,setkeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const [price,setPrice] = useState([1,20000])
  const [input,setInput] = useState("");
  
  useEffect(() => {
    getAllProducts(dispatch,keyword,currentPage,price,category)
  
    
  }, [dispatch])
  
  
  return (
    <>
      {isFetching ? "loading" : <>

      <div className='featprodscontainer'>
        <h1 className='fptitle'>
            Featured Products
        </h1>
        <div className='fpcards'>
           {
             products && products.map(product => (
              <Productcard product = {product}/>
             ))
           }
        </div>
        <Link to = "/products" className="myLinkClass">
          <button className='ebutton'>Explore All  →</button>
        </Link>
        
    </div>
      </>}
    </>
  )
}

export default Featprods