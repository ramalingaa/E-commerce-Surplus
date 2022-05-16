
import { createContext, useContext, useEffect,useReducer } from 'react';
import {getSearchData, getSortedData, getPriceFilteredData, getCatFilteredData, getfilteredProductsData, productReducer} from "./product-context-function/filter-function"
import { useAuthContext } from './context-index';
import { getProducts, getCartProducts, getWishlistProducts } from './getInitialValues';

const ProductContext = createContext()
const useProductContext = () => useContext(ProductContext)


const ProductProvider = ({children}) => {

    const { jwtToken } = useAuthContext();
    const [state, dispatch] = useReducer(productReducer,{data:[],filter:{
        sortBy:"",
        priceRange: 5000,
        category: {men:false,women:false,kids:false},
        rating: "",
        search: ""

    }, cartData:[], wishData:[], cartCounter:0, wishCounter:0})

    //filter data flow functions
    
    const navSearchData = getSearchData(state.data, state.filter.search)
    const priceFilterData = getPriceFilteredData(navSearchData,state.filter.priceRange)
    const categortyFilterData = getCatFilteredData(priceFilterData,state.filter.category)
    const ratingFilteredData = getfilteredProductsData(categortyFilterData, state.filter.rating)
    const filterProductsData = getSortedData(ratingFilteredData, (state.filter.sortBy))


    useEffect(()=>{
        getProducts(dispatch);
        if(jwtToken){
            getCartProducts(jwtToken, dispatch);
            getWishlistProducts(jwtToken, dispatch)
        };
        dispatch({type:"SET_WISH_COUNTER", payload:state.wishData.length})
        dispatch({type:"SET_CART_COUNTER", payload:state.cartData.length})
      },[])
     
      
    return (
        <ProductContext.Provider value = {{filterProductsData, dispatch, state}}>
            {children}
        </ProductContext.Provider>
    )
}
export {useProductContext,ProductProvider}





