import React, { useState, useEffect } from 'react'
import { useProductContext, useAuthContext } from "../../context/context-index"
import { incrementFunction, decrementFunction } from "../ProductListing/product-function/product-fun-index"
import { addToWishFromCartFunction } from '../index-components';
import axios from 'axios';

const CartCard = ({pInfo}) => {

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [wishlistBtn, setWishlistBtn] = useState("Move to Wishlist")
  const { state, dispatch } = useProductContext()
  const { wishData } = state
  const { jwtToken, setCartToast, setToastDisplay } = useAuthContext()


  useEffect(() => {
    const isCartItemInWishData = wishData.filter((ele) => ele.image === pInfo.image)
    if(isCartItemInWishData.length > 0) {
      setWishlistBtn(() => "Wishlisted")
    }
  }, [])
 
 const removeCartItem = () => {
  (async () => {
    try {
      
      const response = await axios.delete(`/api/user/cart/${pInfo._id}`,
      {
        headers: {
          authorization: jwtToken,
        }
      }
      )
      dispatch({type:"SET_CART_DATA", payload:response.data.cart})
      dispatch({type:"SET_CART_COUNTER", payload:response.data.cart.length})
      setCartToast((prev) => ({...prev, removed:!prev.removed}))
    }
    catch (e) {
      console.log("Adding to wishlist failed", e);
    }
  })();
 }

  const incrementCartItems = incrementFunction(dispatch, jwtToken, pInfo)
  const decrementCartItems = decrementFunction(pInfo, dispatch, jwtToken, setCartToast)
  
  const addToWishlist = addToWishFromCartFunction(pInfo, jwtToken, setToastDisplay, dispatch, setWishlistBtn)
  const updateProductSize = (e) => {
    pInfo.size = e.target.value
  }
  return (
    <div className="cart-product-card-container">
        <div>
                <p className={isImageLoaded ? "hide-thumb" : "show-thumb preload-img skelton-img"}></p>
                <img
                    className={isImageLoaded ? "show-thumb res-img cart-img" : "hide-thumb"}
                    alt="cartProduct"
                    src={pInfo.image}
                    onLoad={() => setIsImageLoaded(() => true)}
                />
        </div>
        <div className = "cart-product-card-text-container">
            <p>{pInfo.productBrand}</p>
            <p>{pInfo.productTitle}</p>
            <p>₹{pInfo.price}</p>
            <div className="cart-size-wrapper">
                <p>Size: </p>
                <select onChange = {updateProductSize}>
                  <option value = "S" selected = {pInfo.size === "S"}>S</option>
                  <option value = "M" selected = {pInfo.size === "M"}>M</option>
                  <option value = "L" selected = {pInfo.size === "L"}>L</option>
                  <option  value = "XL" selected = {pInfo.size === "XL"}>XL</option>
                </select>
            </div>
           
            <div className="cart-btn-wrapper">
                <button className="quantity-btn" onClick = {decrementCartItems}><i className="fas fa-minus"></i></button>
                <p>Quantity: {pInfo.qty}</p>
                <button className="quantity-btn" onClick = {incrementCartItems}><i className="fas fa-plus"></i></button>
            </div>
            {wishlistBtn === "Move to Wishlist"?<button className="btn primary" onClick = {addToWishlist}>{wishlistBtn}</button>:<button className="btn disabled" disabled>{wishlistBtn}</button>}
            <i className="fas fa-times product-wishlist-icon cart-product-icon " onClick = { removeCartItem }></i>
        </div>
    </div>
  )
};

export default CartCard;

