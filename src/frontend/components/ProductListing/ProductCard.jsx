import React from 'react'

import { useState } from 'react'
import { ProductList, Filter, WishlistToast, CartToast } from "../index-components"
import { useAuthContext } from "../../context/context-index"



const ProductCard = ({serverData}) => {

  const [cardDisplay, setCardDisplay] = useState("product-container")
  const { toastDisplay, cartToast } = useAuthContext()
  return (
    <div className="product-container-main">
        <Filter setCardDisplay = {setCardDisplay}/>
        <div className ="product-title-wrapper">
        <p className="products-number-title"><strong>Showing All Products</strong> <small>({serverData.length} Products)</small> </p>
        
        <div className = {cardDisplay}>
          
            {
                serverData.map((ele)=>{
                    return (
                          <ProductList key = {ele._id} pInfo = {ele}/>
                    )
                })
            }
        </div>
        </div>
        {toastDisplay.added && <WishlistToast text = "added to"/>}
        {toastDisplay.removed && <WishlistToast text = "removed from"/>}
        { cartToast.added && <CartToast text = "added to"/>}
        { cartToast.removed && <CartToast text = "removed to"/>}

    </div>
  )
};

export default ProductCard;
