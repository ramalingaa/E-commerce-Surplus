import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useProductContext, useAuthContext } from "../../context/context-index"
import axios from "axios"

const OrderConfirmation = () => {
    const { state, dispatch } = useProductContext()
    const { cartData } = state
    const { jwtToken } = useAuthContext()
    useEffect(() => {
        cartData.forEach((ele) => {
            axios.delete(`/api/user/cart/${ele._id}`, {
                headers: {
                  authorization: jwtToken,
                }
              })
        })
        dispatch({type:"SET_CART_DATA", payload:[]})
        dispatch({type:"SET_CART_COUNTER", payload:0})
    },[])

  return (
    <div className = "order-success-wrapper">
        <p className = "text-large fw-5">Order placed successfully <i className="fas fa-badge-check success-icon"></i></p>
        <p>Thanks for shopping with us, you will receive order details in your mail shortly</p>
        <Link to = "/products" className = "btn primary">Continue Shopping With Us</Link>
    </div>
  )
}

export default OrderConfirmation