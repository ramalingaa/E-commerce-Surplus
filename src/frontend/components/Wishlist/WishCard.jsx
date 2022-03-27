import React, { useState } from 'react'
import { ProductList } from "../index-components"
import {  useProductContext} from "../../context/context-index"
import { useNavigate } from "react-router-dom"

export default function WishCard() {
  const [wishPage,setWishPage] = useState(true)
  const { state } = useProductContext()
  const { wishData } = state
  const navigate = useNavigate()

  return (
    <div className={ wishData.length > 0 ? "product-container" : ""}>
      {wishData.map((ele)=>{
        return (
          <ProductList pInfo = {ele} key = {ele.image} wishPage= {wishPage}/>
        )
      })}
      {wishData.length < 1 && <div className = "empty-wish-wrapper">
        <img className = "empty-wishlist-image"src = "https://res.cloudinary.com/ramlinga/image/upload/v1646918447/empty-shopping-bag-icon-online-business-vector-icon-template-vector-id861576608_tvnpvk.jpg" alt = "empty wishlist" />
        <p>Looks like you haven't added anything to your wishlist.</p>
        <button className="btn primary" onClick = {() => navigate("/products")}>Shop Now</button>
        </div>}
    </div>
  )
}
