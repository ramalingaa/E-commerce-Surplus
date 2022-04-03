import React, { useState, useEffect } from 'react'
import { useProductContext } from "../../context/context-index"

export default function OrderSummary({discount}) {
    const [orderPrice, setOrderPrice] = useState({totalPrice:0,discount:discount,delivery:0,discountPriceValue:0})
    const { state } = useProductContext()
    const { cartData, cartCounter } = state
    useEffect(() => {
        orderPrice.discount = discount
    },[discount])
    useEffect(() => {
        const cartPriceDetails = cartData.map((ele) => Number(ele.price) * Number(ele.qty))
        const priceReducer = (prev, curr) => (prev) + (curr)
        const TotalPrice = cartPriceDetails.reduce(priceReducer,0)
        const discountPrice = parseInt(Number(orderPrice.discount) * (TotalPrice/100))
        const deliveryPrice = TotalPrice > 700 ? 0 : 99
        setOrderPrice((prev) => ({...prev,totalPrice:TotalPrice,discount:discount,delivery:deliveryPrice, discountPriceValue:discountPrice}))
    },[cartData, discount])
   
  return (
    <div className = "order-summary-wrapper">
        <p className = "price-details-title price-title-border">PRICE DETAILS (<small>{cartCounter} Items</small>) </p>
        <div className="order-mrp-wrapper">
            <p>Total MRP </p>
            <p>₹{orderPrice.totalPrice}</p>
        </div>
        <div className="order-mrp-wrapper">
            <p>Discount on MRP (<small>20%</small>)</p>
            <p>₹{orderPrice.discountPriceValue} </p>
        </div>
        <div className="order-mrp-wrapper">
            <p>Convenience Fee </p>
            <p>₹{orderPrice.delivery}</p>
        </div>
        <div className="order-mrp-wrapper total-amount-border">
            <p className = "price-details-title">Total Amount</p>
            <p>₹{orderPrice.totalPrice - orderPrice.discountPriceValue}</p>
        </div>
        
    </div>
  )
}
