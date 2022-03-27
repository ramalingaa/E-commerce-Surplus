import React from 'react'

const WishlistToast = ({text}) => {
  return (
    <div>
        <p className = {`snackbar cart-toast ${text === "added to" ? "toast-added" :"toast-removed"}`}>Product {text} Wishlist</p>
    </div>
  )
}

export default WishlistToast