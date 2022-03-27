import axios from "axios";


export function addToCartFunction(pInfo, dispatch, jwtToken, navigate, setCartToast,  setCartBtn = "") {
 
  return () => {
   
    if(jwtToken){
      (async () => {
        try {
          const response = await axios.post("/api/user/cart", {product:{...pInfo}}, {
            headers: {
              authorization: jwtToken,
            }
          });
          dispatch({type:"SET_CART_DATA", payload:response.data.cart})
          dispatch({type:"SET_CART_COUNTER", payload:response.data.cart.length})
          setCartBtn && setCartBtn(() => "Go To Cart")
          setCartToast((prev) => ({...prev, added:!prev.added}))

        }
        catch (e) {
          console.log("Adding to wishlist failed", e);
        }
      })();
    }
    else {
      navigate("/Login")
    }
   
  };
  
}
