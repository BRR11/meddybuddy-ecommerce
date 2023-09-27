import React from 'react'
import "../products/products.scss"
import {FaSearch} from "react-icons/fa"
import {useSelector,useDispatch} from "react-redux"
import { getAllProducts } from '../../redux/apicalls'
import Productcard from '../../component/productcard/Productcard'
import { useEffect ,useState} from 'react'
import Navbar from '../../component/Navbar/Navbar'
import Footer from '../../component/Footer/Footer'
import Pagination from "react-js-pagination";
import SelectInput from '@mui/material/Select/SelectInput'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


const categories = ["protein and vitamins","Diabetes","Healthcare Devices","Personal Care","Ayurveda Products","Homeopathy","Covid Essentials"]
const priceFilters = [[1, 100], [1, 1000], [1, 5000], [1, 10000]];

function Products({match}) {
    const dispatch = useDispatch();
    const [keyword,setkeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const {isFetching,products,error,productscount,productsperpage} = useSelector(state => state.products);
    const [price,setPrice] = useState([1,20000])
    const [input,setInput] = useState("");
    const [category,setCategory] = useState("");
    useEffect(() => {
      
        getAllProducts(dispatch,keyword,currentPage,price,category)
    
      
    }, [dispatch,keyword,currentPage,price,category]);
    
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };
    const Handleclick = () => {
      setkeyword(input);
    }
  
    const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [selectedPriceFilter, setSelectedPriceFilter] = useState("");

  const handlePriceFilterClick = (priceFilter) => {
    setPrice(priceFilter);
    setSelectedPriceFilter(priceFilter);
  };
    
  return (
    <>
    {isFetching ? "loading" : 
    <div className='pp'>
        
   <div className='products_page'>

<Navbar/>

    <div className='searchbar'>
       

          <input placeholder='Search Medicines'  onChange = {(e) => setInput(e.target.value)}  />
          <button onClick={Handleclick}><SearchOutlinedIcon/></button>
    </div>

 




<div className='products_section'>
   
    <div className="app">
    
     <div className="sidebar">
         
      <ul className='category'>
          <h1>Shop By Category</h1>
        {
          categories.map((index) => (
            <li className={`category_link ${index === category ? 'selected' : ''}`} key = {index} onClick={()=> setCategory(index)}>
              {index}
            </li>
          ))
        }

      </ul>
      <ul className='pricefilter'>
          <h1>Filter By Price</h1>
          {
          priceFilters.map((priceFilter, index) => (
            <li className={`pricefilterlink ${selectedPriceFilter === priceFilter ? 'selected' : ''}`} key = {index} onClick={()=> handlePriceFilterClick(priceFilter)}>
              less than ₹{priceFilter[1]}
            </li>
          ))
        }
         
         
      </ul>
   
      
        </div>
     
    </div>
    <div className='products-shop'>
{products && products.map((product)=> (
    <Productcard key = {product._id} product = {product}/>
    
))}
 



</div>
</div>

{productsperpage < productscount && (
    <div className="paginationBox">
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={productsperpage}
        totalItemsCount={productscount}
        onChange={setCurrentPageNo}
        nextPageText="Next"
        prevPageText="Prev"
        firstPageText="1st"
        lastPageText="Last"
        itemClass="page-item"
        linkClass="page-link"
        activeClass="pageItemActive"
        activeLinkClass="pageLinkActive"
      />
    </div>
  )}
<Footer/>
</div>
    </div>
   
   }
    </>
  )
}

export default Products