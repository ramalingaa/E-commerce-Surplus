import React, { useState } from 'react'
import { useProductContext, useAuthContext, useAddress } from "../../context/context-index"
import { useNavigate, Link } from 'react-router-dom';
import { CartToast, WishlistToast, CartCard, OrderSummary } from '../index-components';


const Cart = () => {
  
    const { state } = useProductContext()
    const navigate  = useNavigate()
    const { cartData } = state
    const { addressState, dispatch } = useAddress()
    const { toastDisplay, cartToast } = useAuthContext()
    const [ couponDisplay, setCouponDisplay] = useState({coupon:false, error:false})
    const toggleCouponDisplay = () => {
      setCouponDisplay((prev) => ({...prev, coupon: !couponDisplay.coupon}))
    }
    const updateCouponData = (e) => {
      e.target.value !== "cb20" ? setCouponDisplay((prev) => ({...prev, error:true})) :setCouponDisplay((prev) => ({...prev, error:false}))
      dispatch({type:"SET_COUPON_DATA", payload:e.target.value})
    }
    const applyCoupon = () => {
      addressState.coupon === "cb20" ? setCouponDisplay((prev) => ({coupon:false, error:false})) :setCouponDisplay((prev) => ({...prev, error: !couponDisplay.error}))
      

    }
  return (
    <div>
      <div className = {cartData.length > 0 ? "cart-product-mainWrapper": ""}>
        <div className ="cart-productCard-wrapper">
          {cartData.map((ele)=>{
            return <CartCard pInfo = {ele} key = {ele.id}/>
          })}
        </div>
        {cartData.length > 0 && <div className = "ordereSummary-wrapper">
        <div className="order-mrp-wrapper">
            <p><i className="fal fa-tag"></i>Apply Coupons</p>
           {!couponDisplay.coupon &&  <button className = "btn coupon-btn" onClick = {toggleCouponDisplay}>Apply</button>}
        </div>
       {couponDisplay.coupon && <div className="order-mrp-wrapper">
            <input type="text" placeholder = "cb20" className="i-text" onChange = {updateCouponData}/>
            <button className = "btn coupon-btn" onClick={applyCoupon}>Apply</button>
        </div>}
        {couponDisplay.error && <p className = "error-msg">Coupon does not exist</p>}
           {cartData.length > 0 && (addressState.coupon === "cb20" ?<OrderSummary discount = {20}/> :<OrderSummary discount = {0}/> )}
           <Link to = "/address" className = "btn primary order-btn">PLACE ORDER</Link>
        </div>}
        {cartData.length < 1 && <div className = "empty-wish-wrapper">
        <img className = "empty-wishlist-image"src = "https://res.cloudinary.com/ramlinga/image/upload/v1646919491/shopping-cart-isolated-white-background_C3_AF_C2_BC_C5_93there-no-data-shopping-cart_C3_AF_C2_BC_C5_93small-bee-shopping-cart-empty-vector-122894182_f9b2m5.jpg" alt = "empty wishlist" />
        <p>Looks like you haven't added anything to your Cart.</p>
        <button className="btn primary" onClick = {() => navigate("/products")}>Shop Now</button>
        </div>}
        
    </div>
      { cartToast.added && <CartToast text = "added to"/>}
        { cartToast.removed && <CartToast text = "removed to"/>}
        {toastDisplay.added && <WishlistToast text = "added to"/>}
    </div>
  )
};

export default Cart;
