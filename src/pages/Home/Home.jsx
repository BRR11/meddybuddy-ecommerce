import React from 'react'
import Navbar from "../../component/Navbar/Navbar"
import Section1 from '../../component/section1/Section1'
import Footer from '../../component/Footer/Footer'
import Featprods from '../../component/featuredproducts/Featprods'
import "../Home/Home.scss"

function Home() {
  return (
    <div>
        <Navbar/>
        <Section1/>
        <Featprods/>
       
    <div className="container">
    <h1 className="section-heading">Why Choose Us ?</h1>
          <p className="section-description"></p>
       <div className="wcu_cards">
          
      
        {[
          {
            imageUrl: "https://img.freepik.com/free-vector/modern-shopping-banner-design-background_1017-16285.jpg?1&w=1480&t=st=1683661083~exp=1683661683~hmac=d935b242e299becf5af1a804aca698cdb27d20da1e658529e67f3bf340a4635b",
            heading: "Competitive pricing",
            description: "we often offer competitive pricing compared to physical stores, due to lower overhead costs.",
          },
          {
            imageUrl: "https://img.freepik.com/free-vector/flat-3d-isometric-pharmaceutics-pharmacy-drug-store_126523-1607.jpg?w=1380&t=st=1683660935~exp=1683661535~hmac=d6ce6584a5e11413df3d5cc6f481bb2ec759499a9d0e8762c4de0776a696c83a",
            heading: "Wide Range Of Products",
            description: "We offer a wide range of products, including prescription medications, over-the-counter medications, medical supplies, and other healthcare products.",
          },
          {
            imageUrl: "https://as1.ftcdn.net/v2/jpg/04/20/47/34/1000_F_420473478_7sYhsKpencRnTsP5lqf2Hmy1FT5PZCKX.jpg",
            heading: "Express Delivery",
            description: "Our express delivery can be a valuable service for customers who prioritize speed, convenience, and peace of mind when shopping Medicines online",
          }
        ].map((card, index) => (
        
            <div className="wcu-card mb-5" key = {index}>
              <img src={card.imageUrl} className="wcu-card-image" alt={card.heading} />
              <h1 className="wcu-card-heading mt-2">{card.heading}</h1>
              <p className="wcu-card-description">{card.description}</p>
            
          </div>
        ))}
      </div>
    </div>

        <Footer/>
    </div>
  )
}

export default Home