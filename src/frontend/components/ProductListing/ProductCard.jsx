import React from 'react'

import { useState } from 'react'
import { ProductList, Filter } from "../index-components"



export default function ProductCard({serverData}) {

  const [cardDisplay, setCardDisplay] = useState("product-container")
  return (
    <div className="product-container-main">
        <Filter setCardDisplay = {setCardDisplay}/>
        <div className ="product-title-wrapper">
        <p className="products-number-title"><strong>Showing All Products</strong> <small>({serverData.length} Products)</small> </p>
        
        <div className = {cardDisplay}>
          
            {
                serverData.map((ele)=>{
                    return (
                        <>
                          <ProductList key = {ele.image} pInfo = {ele}/>
                        </>
                    )
                })
            }
        </div>
        </div>
    </div>
  )
}
