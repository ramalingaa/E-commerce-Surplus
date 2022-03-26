import axios from "axios";


export function addToWishlistFunction(wishPage, wishData, pInfo, setIsWishItem, setWishIcon, dispatch, isWishItem,wishItem, jwtToken, navigate) {

  return () => {
   if( jwtToken ){
      //If wishpage is open if condition will get executed
    if (wishPage) {
      (async () => {
        try {
          const response = await axios.delete(`/api/user/wishlist/${pInfo._id}`,{headers: {
            authorization: jwtToken,
          }});
          if (response.status === 200) {
            setIsWishItem(false);
            setWishIcon("");
            dispatch({type:"SET_WISH_DATA", payload:response.data.wishlist})
            dispatch({type:"SET_WISH_COUNTER", payload:response.data.wishlist.length})
            
          }
        }
        catch (e) {
          console.log("Adding to wishlist failed", e);
        }
      })();
    }


    //product page functionality for add to wishlist button
    else {
      //If not added to wishlist the item will be added to wishlist. The initial state is false so it get's added to wishlist on first click
      if (!isWishItem) {
        (async () => {
          try {
            const response = await axios.post("/api/user/wishlist", {product:{...pInfo}}, {
              headers: {
                authorization: jwtToken,
              }
            }
            );
            setIsWishItem(true);
            dispatch({type:"SET_WISH_DATA", payload:response.data.wishlist})
            setWishIcon("icon-selected");
            dispatch({type:"SET_WISH_COUNTER", payload:response.data.wishlist.length})
          }
          catch (e) {
            console.log("Adding to wishlist failed", e);
          }
        })();
      }


      //If the item is already added to wishlist it will be deleted 
      else {
        (async () => {
          try {
            
            const newWishData = wishData.filter((ele) => ele._id !== wishItem._id)
            const response = await axios.delete(`/api/user/wishlist/${wishItem._id}`,{headers: {
              authorization: jwtToken,
            }});
            setIsWishItem(false);
            setWishIcon("");
          
            dispatch({type:"SET_WISH_DATA", payload:response.data.wishlist})
            dispatch({type:"SET_WISH_COUNTER", payload:response.data.wishlist.length})


          }
          catch (e) {
            console.log("Adding to wishlist failed", e);
          }
        })();
      }
    }
   }
   else {
     navigate("/Login")
   }
  };
}
