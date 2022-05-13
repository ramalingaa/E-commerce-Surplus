import React, { useEffect, useState } from 'react'
import {  useProductContext,  useAuthContext } from "../../context/context-index"
import { decrementFunction, incrementFunction, addToCartFunction, addToWishlistFunction } from "./product-function/product-fun-index"
import { Link, useNavigate } from 'react-router-dom';


const ProductList = ({pInfo, wishPage}) => {
  
  const [isWishItem, setIsWishItem] = useState(false)
  const [wishIcon, setWishIcon] = useState("")
  const [isCartItem, setIsCartItem] = useState(false)
  const [cartItem, setCartItem] = useState({})
  const [wishItem, setWishItem] = useState({})
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  
  const { state, dispatch } = useProductContext()
  const { cartData, wishData } = state
  const {jwtToken, setToastDisplay, setCartToast } = useAuthContext()
  const navigate = useNavigate()

  //setting the wishicon with previosly selected wishitems
  useEffect(()=>{
    const isWishItemAdded = wishData.find((ele) => ele.image === pInfo.image)
    if(isWishItemAdded){
      setIsWishItem(true)
      setWishItem({...isWishItemAdded})
    }
  },[wishData])

  useEffect(()=>{
    const isCartItemAdded = cartData.find((ele) => ele.image === pInfo.image)
    if(isCartItemAdded){
      setIsCartItem(true)
      setCartItem({...isCartItemAdded})
    }
  },[cartData])
  
 // Wishlist icon button functionality on click of button
  const addToWishList = addToWishlistFunction(wishPage, pInfo, setIsWishItem, setWishIcon, dispatch, isWishItem, wishItem, jwtToken, navigate, setToastDisplay)

    //Add to cart button functionality goes here
    const addToCart = addToCartFunction(pInfo, dispatch, jwtToken, navigate, setCartToast)
    //Incrementing the quantity of cart items
    const incrementCartItems = incrementFunction( dispatch, jwtToken, cartItem)
    //decrementing the quantity of cart items
    const decrementCartItems = decrementFunction(cartItem, dispatch, jwtToken, setCartToast, setIsCartItem)
    // redirecting to single product page on click
    
    const goToCart = () => {
      navigate("/cart")
    }
    const throttleFunction = (callback, delay) => {
      let freeze = false 
      let timer;
      return function(){
        if(!freeze){
          timer && clearTimeout(timer)
          callback()
          freeze = true
          timer = setTimeout(() =>freeze = false, delay)
        }
      }
    }
    const addToCartThrottle = throttleFunction(addToCart, 1000)
    const decrementCartItemsThrottle = throttleFunction(decrementCartItems, 1000)
    const incrementCartItemsThrottle = throttleFunction(incrementCartItems, 1000)
    const addToWishListThrottle = throttleFunction(addToWishList, 1000)
  return (
    <div className = "product-card">
        <Link to = {`/products/${pInfo._id}`}>
               <p className={isImageLoaded ? "hide-thumb" : "show-thumb product-img skelton-img"}></p>
                <img
                    className={isImageLoaded ? "show-thumb res-img product-img" : "hide-thumb"}
                    alt="mens Shirt"
                    src={pInfo.image}
                    onLoad={() => setIsImageLoaded(() => true)}
                />
        </Link>
        <p>{pInfo.productBrand}</p>
        <p>{pInfo.productTitle}</p>
        <p>₹{pInfo.price}</p>

        {!wishPage && (isWishItem ?(<i className={`fas fa-heart product-wishlist-icon icon-selected`} onClick = {addToWishListThrottle}></i>): (<i className={`fas fa-heart product-wishlist-icon`} onClick = {addToWishListThrottle}></i>))}

        { !(isCartItem) && <button className="btn primary card-button" onClick = {addToCartThrottle}>Add to Cart</button>}
        {(isCartItem && !wishPage) && (
        <div className="added-cart-wrapper">
          <button onClick = {decrementCartItemsThrottle} className=" quantity-btn"><i className="fas fa-minus"></i></button>
          <p>Quantity: {cartItem.qty}</p>
          <button onClick = {incrementCartItemsThrottle} className=" quantity-btn"><i className="fas fa-plus"></i></button>
        </div>
        )
        }
        {wishPage && (isCartItem && <button className="btn primary card-button" onClick = {goToCart}>Go to Cart</button>)}
        {wishPage && <i className={`fas fa-heart product-wishlist-icon icon-selected`} onClick = {addToWishListThrottle}></i>}
    </div>
  )
};

export default ProductList;




