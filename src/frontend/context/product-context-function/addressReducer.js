const addressReducer = (state, action) => {
    switch (action.type) {
        case "SET_ADDRESS_DATA" :{
            return {...state, address:action.payload}
        }
        case "SET_COUPON_DATA" :{
            return {...state, coupon:action.payload}
        }
        case "SET_FINAL_PRICE" :{
            return {...state, finalPrice:action.payload}
        }
        default: {
            return state
        }
    }
}
export { addressReducer }