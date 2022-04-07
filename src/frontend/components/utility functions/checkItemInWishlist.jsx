export function checkItemInWishlist(wishData, singleProduct, setWishlistBtn) {
  const isItemInWishData = wishData.filter((ele) => ele.image === singleProduct.image);
  if (isItemInWishData.length > 0) {
    setWishlistBtn(() => "Wishlisted");
  }
}
