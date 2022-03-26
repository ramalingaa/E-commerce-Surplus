
import { createContext, useContext, useEffect,useReducer } from 'react';
import  axios  from 'axios';
import {getSearchData, getSortedData, getPriceFilteredData, getCatFilteredData, getfilteredProductsData, productReducer} from "./product-context-function/filter-function"
import { useAuthContext } from './context-index';

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

    }, cartData:[], wishData:[], singleProduct: {}, cartCounter:0, wishCounter:0})

    
    //filter data flow functions
    
    const navSearchData = getSearchData(state.data, state.filter.search)
    const sortedData = getSortedData(navSearchData, (state.filter.sortBy))
    const priceFilterData = getPriceFilteredData(sortedData,state.filter.priceRange)
    const categortyFilterData = getCatFilteredData(priceFilterData,state.filter.category)
    const filterProductsData = getfilteredProductsData(categortyFilterData, state.filter.rating)

    useEffect(()=>{
        (async ()=>{
            try {
            const response = await axios.get("/api/products")
            dispatch({type:"SET_SERVER_DATA",payload:response.data.products})
            }
            catch(e){
                console.log("Data fetching is failed")
            }
        })()
      },[])
      useEffect(()=> {
        (async ()=> {
            try {
                const response = await axios.get("/api/user/cart",{headers:{authorization:jwtToken}})
                dispatch({type:"SET_CART_DATA", payload:response.data.cart})

            }catch(e){
                console.log("loading cart items failed",":", e)
            }
        })()
    },[])
    useEffect(()=> {
        (async ()=>{
    
            try {
              const response = await axios.get("/api/user/wishlist",{headers:{authorization:jwtToken}})
              dispatch({type:"SET_WISH_DATA", payload:response.data.wishlist})
              
            }
            catch(e){
              console.log("Wishlist page failed to load items")
            }
          })()
    },[])
    useEffect(() => {
        dispatch({type:"SET_WISH_COUNTER", payload:state.wishData.length})
        // dispatch({type:"SET_CART_COUNTER", payload:state.cartData.length})

    },[])
      
    return (
        <ProductContext.Provider value = {{filterProductsData, dispatch, state}}>
            {children}
        </ProductContext.Provider>
    )
}
export {useProductContext,ProductProvider}
