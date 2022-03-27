import axios from 'axios';

export function addToWishFromCartFunction(pInfo, jwtToken, setToastDisplay, dispatch, setWishlistBtn) {
  return () => {
    (async () => {
      try {
        const response = await axios.post("/api/user/wishlist", { product: { ...pInfo } }, {
          headers: {
            authorization: jwtToken,
          }
        }
        );
        setToastDisplay((prev) => ({ ...prev, added: !prev.added }));

        dispatch({ type: "SET_WISH_DATA", payload: response.data.wishlist });
        dispatch({ type: "SET_WISH_COUNTER", payload: response.data.wishlist.length });
        setWishlistBtn(() => "Wishlisted");

      }
      catch (e) {
        console.log("Adding to wishlist failed", e);
      }
    })();
  };
}
