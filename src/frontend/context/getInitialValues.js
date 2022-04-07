import axios from 'axios';

export function getProducts(dispatch) {
    (async () => {
        try {
            const response = await axios.get("/api/products");
            dispatch({ type: "SET_SERVER_DATA", payload: response.data.products });
        }
        catch (e) {
            console.log("Data fetching is failed");
        }
    })();
}
export function getCartProducts(jwtToken, dispatch) {
    (async () => {
        try {
            const response = await axios.get("/api/user/cart", { headers: { authorization: jwtToken } });
            dispatch({ type: "SET_CART_DATA", payload: response.data.cart });

        } catch (e) {
            console.log("loading cart items failed", ":", e);
        }
    })();
}
export function getWishlistProducts(jwtToken, dispatch) {
    (async () => {

        try {
            const response = await axios.get("/api/user/wishlist", { headers: { authorization: jwtToken } });
            dispatch({ type: "SET_WISH_DATA", payload: response.data.wishlist });

        }
        catch (e) {
            console.log("Wishlist page failed to load items");
        }
    })();
}
