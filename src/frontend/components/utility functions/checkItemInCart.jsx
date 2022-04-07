export function checkItemInCart(cartData, singleProduct, setCartBtn) {
  const isItemInCartData = cartData.filter((ele) => ele.image === singleProduct.image);
  if (isItemInCartData.length > 0) {
    setCartBtn(() => "Go to Cart");
  }
}
