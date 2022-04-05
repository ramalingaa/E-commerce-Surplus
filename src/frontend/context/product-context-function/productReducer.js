const productReducer = (state, action) => {
    switch(action.type){

        case "SET_SERVER_DATA": {
            return {...state,data:action.payload}
        }
        case "SEARCH_FILTER" : {
            return {...state, filter:{...state.filter,search:action.payload}} 
        }
        case "PRICE_FILTER" : {
           
            return {...state, filter:{...state.filter,priceRange:action.payload}}
        }
        case "CAT_MEN" : {
            if(action.payload === "catMen"){
                return {...state, filter:{...state.filter,category:{...state.filter.category,men:true}}}
            }
           if (action.payload === "Men"){
            return {...state, filter:{...state.filter,category:{...state.filter.category,men:!state.filter.category.men}}}
           }
           return state
        }
        case "CAT_WOMEN" : {
            if(action.payload === "catWomen"){
                return {...state, filter:{...state.filter,category:{...state.filter.category,women:true}}}
            }
           if (action.payload === "Women"){
            return {...state, filter:{...state.filter,category:{...state.filter.category,women:!state.filter.category.women}}}
           }
           return state
         }
         case "CAT_KIDS" : {
            if(action.payload === "catKids"){
                return {...state, filter:{...state.filter,category:{...state.filter.category,kids:true}}}
            }
           if (action.payload === "Kids"){
            return {...state, filter:{...state.filter,category:{...state.filter.category,kids:!state.filter.category.kids}}}
           }
           return state
         }
        case "RESET_FILTER" : {
            return {...state, filter:{
                search:"",
                sortBy:"",
                priceRange: 5000,
                category: {men:false,women:false,kids:false},
                rating: ""
        
            }}
        }
        case "RATING_FILTER": {

            return {...state, filter:{...state.filter,rating:action.payload}}
        }
        case "SORT_BY_PRICE": {
                return {...state,filter:{...state.filter,sortBy:action.payload}} 
        }
        case "SET_CART_DATA": {
            return {...state, cartData:action.payload}
        }
        case "SET_WISH_DATA": {
            return {...state, wishData:action.payload}
        }
        case "SET_WISH_COUNTER": {
            return {...state, wishCounter:action.payload}
        }
        case "SET_CART_COUNTER": {
            return {...state, cartCounter:action.payload}
        }
        default:{
        }
    }
}

export { productReducer }