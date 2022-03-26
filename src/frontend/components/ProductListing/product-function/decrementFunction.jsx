import axios from "axios";

export function decrementFunction(cartItem, dispatch, setIsCartItem, jwtToken) {

  return () => {
    if (Number(cartItem.qty) > 1) {
      (async () => {
        try {
         
          const response = await axios.post(`/api/user/cart/${cartItem._id}`, {
            action: {
              type: "decrement",
            }
          },
          {
            headers: {
              authorization: jwtToken,
            }
          }
          )
          dispatch({type:"SET_CART_DATA", payload:response.data.cart})



        }
        catch (e) {
          console.log("Adding to wishlist failed", e);
        }
      })();

    }
    else if (Number(cartItem.qty) === 1) {
      (async () => {
        try {
          
          const response = await axios.delete(`/api/user/cart/${cartItem._id}`,
          {
            headers: {
              authorization: jwtToken,
            }
          }
          )
          dispatch({type:"SET_CART_DATA", payload:response.data.cart})
          dispatch({type:"SET_CART_COUNTER", payload:response.data.cart.length})

          setIsCartItem(false);
        }
        catch (e) {
          console.log("Adding to wishlist failed", e);
        }
      })();
    }
  };
}
