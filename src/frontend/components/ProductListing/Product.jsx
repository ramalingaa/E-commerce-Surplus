import { ProductCard, WishlistToast, CartToast } from "../index-components";
import { useProductContext, useAuthContext } from "../../context/context-index"



const Product = () => {
 const { filterProductsData } = useProductContext()
 const { toastDisplay, cartToast } = useAuthContext()

  return (
    <div >
      <ProductCard serverData = {filterProductsData}/>
      {toastDisplay.added && <WishlistToast text = "added to"/>}
      {toastDisplay.removed && <WishlistToast text = "removed from"/>}
      { cartToast.added && <CartToast text = "added to"/>}
      { cartToast.removed && <CartToast text = "removed to"/>}
    </div>
    
  );
};

export default Product;

