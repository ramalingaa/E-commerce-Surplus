import React from 'react'
import {  useAuthContext } from "../../context/context-index"
import { WishCard, WishlistToast, CartToast } from "../index-components"


export default function Wishlist() {
  const { toastDisplay, cartToast } = useAuthContext()
  return (
    <div className = "wishlist-wrapper">
        <WishCard />
        {toastDisplay.added && <WishlistToast text = "added to"/>}
        {toastDisplay.removed && <WishlistToast text = "removed from"/>}
        { cartToast.added && <CartToast text = "added to"/>}
    </div>
  )
}
