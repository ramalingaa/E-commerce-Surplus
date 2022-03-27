import React, { useEffect, useState } from 'react'
import {  useProductContext,  useAuthContext } from "../../context/context-index"
import { decrementFunction, incrementFunction, addToCartFunction, addToWishlistFunction } from "./product-function/product-fun-index"
import { Link, useNavigate } from 'react-router-dom';


export default function ProductList({pInfo, wishPage}) {
  
  const [isWishItem, setIsWishItem] = useState(false)
  const [wishIcon, setWishIcon] = useState("")
  const [isCartItem, setIsCartItem] = useState(false)
  const [cartItem, setCartItem] = useState({})
  const [wishItem, setWishItem] = useState({})
  
  const { state, dispatch } = useProductContext()
    const { cartData, wishData, singleProduct } = state
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
    const updateProductPage = () => {
      dispatch({type:"SET_SINGLE_PRODUCT", payload: pInfo});
    }
    const goToCart = () => {
      navigate("/cart")
    }
  return (
    <div className = "product-card">
        <Link to = "/SPP"><img src={pInfo.image} alt="mens Shirt" className="res-img product-img" onClick = {updateProductPage}/></Link>
        <p>{pInfo.productBrand}</p>
        <p>{pInfo.productTitle}</p>
        <p>₹{pInfo.price}</p>

        {!wishPage && (isWishItem ?(<button onClick = {addToWishList}><i className={`fas fa-heart product-wishlist-icon icon-selected`}></i></button> ): (<button onClick = {addToWishList}><i className={`fas fa-heart product-wishlist-icon`}></i></button>))}

        { !(isCartItem) && <button className="btn primary card-button" onClick = {addToCart}>Add to Cart</button>}
        {(isCartItem && !wishPage) && (
        <div className="added-cart-wrapper">
          <button onClick = {decrementCartItems} className=" quantity-btn"><i className="fas fa-minus"></i></button>
          <p>Quantity: {cartItem.qty}</p>
          <button onClick = {incrementCartItems} className=" quantity-btn"><i className="fas fa-plus"></i></button>
        </div>
        )
        }
        {wishPage && (isCartItem && <button className="btn primary card-button" onClick = {goToCart}>Go to Cart</button>)}
        {wishPage && <button onClick = {addToWishList}><i className={`fas fa-heart product-wishlist-icon icon-selected`}></i></button>}
    </div>
  )
}




