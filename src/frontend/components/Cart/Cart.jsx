import React from 'react'
import { useProductContext, useAuthContext } from "../../context/context-index"
import { useNavigate } from 'react-router-dom';
import { CartToast, WishlistToast, CartCard, OrderSummary } from '../index-components';


export default function Cart() {
    const { state } = useProductContext()
    const navigate  = useNavigate()
    const { cartData } = state
    const { toastDisplay, cartToast } = useAuthContext()

    
  return (
    <div className = {cartData.length > 0 ? "cart-product-mainWrapper": ""}>
        <div className ="cart-productCard-wrapper">
          {cartData.map((ele)=>{
            return <CartCard pInfo = {ele} key = {ele.id}/>
          })}
        </div>
        <div className = "ordereSummary-wrapper">
           {cartData.length > 0 && <OrderSummary />}
        </div>
        {cartData.length < 1 && <div className = "empty-wish-wrapper">
        <img className = "empty-wishlist-image"src = "https://res.cloudinary.com/ramlinga/image/upload/v1646919491/shopping-cart-isolated-white-background_C3_AF_C2_BC_C5_93there-no-data-shopping-cart_C3_AF_C2_BC_C5_93small-bee-shopping-cart-empty-vector-122894182_f9b2m5.jpg" alt = "empty wishlist" />
        <p>Looks like you haven't added anything to your Cart.</p>
        <button className="btn primary" onClick = {() => navigate("/products")}>Shop Now</button>
        </div>}
        { cartToast.added && <CartToast text = "added to"/>}
        { cartToast.removed && <CartToast text = "removed to"/>}
        {toastDisplay.added && <WishlistToast text = "added to"/>}
    </div>
  )
}
