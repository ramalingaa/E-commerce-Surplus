import axios from "axios";

export function incrementFunction( pInfo, cartItem = pInfo, dispatch, jwtToken) {

  return () => {
    console.log(cartItem._id);
    (async () => {
      try {
      

         const response = await axios.post(`/api/user/cart/${cartItem._id}`, {
          action: {
            type: "increment",
          }
        },
        {
          headers: {
            authorization: jwtToken,
          }
        }
        );
        dispatch({type:"SET_CART_DATA", payload:response.data.cart})
      }
      catch (e) {
        console.log("Adding to Cart failed", e);
      }
    })();
  };
}
