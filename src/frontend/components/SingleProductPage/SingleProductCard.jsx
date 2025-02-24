import React, { useState, useEffect } from 'react'
import { useProductContext, useAuthContext } from "../../context/context-index"
import { addToCartFunction } from "../ProductListing/product-function/product-fun-index"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { WishlistToast, CartToast, addToWishFromCartFunction } from "../index-components"
import { checkItemInCart, checkItemInWishlist } from '../utility functions/uti-index';

const SingleProductCard = () => {

    const [wishlistBtn, setWishlistBtn] = useState("Wishlist")
    const [cartBtn, setCartBtn] = useState("Add to Cart")
    const [sizeBtn, setSizeBtn] = useState("")
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const { state,dispatch } = useProductContext()
    const { cartData, wishData, data } = state
    const { jwtToken, toastDisplay, cartToast, setCartToast, setToastDisplay } = useAuthContext()
    const navigate = useNavigate()
    const param = useParams()
    const singleProduct = data.find((ele) => ele._id === param.productId)
    useEffect(() => {

        checkItemInWishlist(wishData, singleProduct, setWishlistBtn);
        checkItemInCart(cartData, singleProduct, setCartBtn);

      }, [])
      
     
    
      const addToWishlist = addToWishFromCartFunction(singleProduct, jwtToken, setToastDisplay, dispatch, setWishlistBtn)
      const addToCart = addToCartFunction(singleProduct,dispatch,jwtToken, navigate, setCartToast, setCartBtn)

      const selectSize = (e) => {
        singleProduct.size =  e.target.innerText
        setSizeBtn(() => e.target.innerText)
      }
      const goToCart = () => {
          navigate("/cart")
      }

  return (
    <div className = "single-product-wrapper">
        <p className={isImageLoaded ? "hide-thumb" : "show-thumb product-pageImg skelton-img"}></p>
        <img
          className={isImageLoaded ? "show-thumb res-img product-pageImg" : "hide-thumb"}
          alt="product"
          src={singleProduct?.image}
          onLoad={() => setIsImageLoaded(() => true)}
        />
        <div className = "single-product-text">
            <p>{singleProduct?.productTitle} by <strong>{singleProduct?.productBrand}</strong></p>
            <p>Rating: {singleProduct?.rating} <i className="fas fa-star rating-icon"></i></p>
            <p className = "price-tag">₹{singleProduct?.price} <small className="offer-tag">20% off</small></p>
            <p className="tax-inclusive-tag">Inclusive of all taxes</p>
            <h3 className = "size-header">Select size</h3>
            <div className = "size-btn-wrapper">
                <button className = {`btn-fab size-btn ${sizeBtn === "S" && "size-selected"}`} onClick = {selectSize}>S</button>
                <button className = {`btn-fab size-btn ${sizeBtn === "M" && "size-selected"}`} onClick = {selectSize}>M</button>
                <button className = {`btn-fab size-btn ${sizeBtn === "L" && "size-selected"}`} onClick = {selectSize}>L</button>
                <button className = {`btn-fab size-btn ${sizeBtn === "XL" && "size-selected"}`} onClick = {selectSize}>XL</button>
            </div>
            <div className="button-wrapper">
                {wishlistBtn === "Wishlist" ? <button className = "btn outlined product-page-btn" onClick={addToWishlist}>{wishlistBtn}</button> :<button className = "btn outlined product-page-btn disabled" disabled>{wishlistBtn}</button>}
                {cartBtn === "Add to Cart" ? <button className = "btn primary product-page-btn"onClick={addToCart}>{cartBtn}</button> : <Link to = "/cart" className = "cart-link-align"><button className = "btn primary product-page-btn" onClick = {goToCart}>{cartBtn}</button></Link>}
            </div>
            <p>Sold by {singleProduct?.productBrand} Pvt.ltd</p>
            <p><i className="fal fa-truck-moving product-info-icon"></i><strong> Get it by time { new Date().getDate()  }-{ new Date().getMonth() + 1 }-{ new Date().getFullYear()}</strong></p>
            
            {Number(singleProduct?.price) < 1000 ? <p><i className="far fa-hand-holding-box product-info-icon"></i><strong>Pay on delivery is available</strong></p> : <p><i className="far fa-hand-holding-box product-info-icon"></i><strong> This item is not eligible for Pay on Delivery</strong></p>}
            <p><i className="fal fa-sync-alt product-info-icon"></i><strong>Easy 30 days return & exchange available</strong></p>
            <p><i className="fas fa-badge-check product-info-icon secure-icon"></i>100% Original Products</p>
            <div className="product-details-wrapper">
              <h2>Product Details</h2>
              <p>{singleProduct?.productTitle} by {singleProduct?.productBrand}</p>
              <h3>Size & Fit</h3>
              <p>The model (height 6') is wearing a size M</p>
              <h3>Material & Care</h3>
              <p>100% cotton Machine-wash</p>
        </div>
        </div>
        {toastDisplay.added && <WishlistToast text = "added to"/>}
        { cartToast.added && <CartToast text = "added to"/>}
    </div>
  )
}

export default SingleProductCard


