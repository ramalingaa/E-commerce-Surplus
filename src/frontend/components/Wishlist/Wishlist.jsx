import React from 'react'
import {  useAuthContext } from "../../context/context-index"
import { WishCard, WishlistToast } from "../index-components"


export default function Wishlist() {
  const { toastDisplay } = useAuthContext()
  console.log(toastDisplay)
  return (
    <div className = "wishlist-wrapper">
        <WishCard />
        {toastDisplay.added && <WishlistToast text = "added to"/>}
        {toastDisplay.removed && <WishlistToast text = "removed from"/>}
    </div>
  )
}
