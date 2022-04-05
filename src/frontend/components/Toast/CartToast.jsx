import React from 'react'

const CartToast = ({text}) => {
  
  return (
    <div>
        <p className = {`snackbar cart-toast ${text === "added to" ? "toast-added" :"toast-removed"}`}>Product {text} Cart</p>

    </div>
  )
}

export default CartToast