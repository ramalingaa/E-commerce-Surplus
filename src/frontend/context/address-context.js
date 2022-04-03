import { createContext, useContext, useReducer, useEffect } from 'react';
import { addressReducer } from "./product-context-function/addressReducer"
import axios from "axios";
import { useAuthContext } from "./context-index"

const AddressContext = createContext()
const useAddress = () => useContext(AddressContext)


const AddressProvider = ({children}) => {
    const { jwtToken } = useAuthContext()
    const [addressState, dispatch] = useReducer(addressReducer, {address:[],coupon:""})
    useEffect(() => {

        (async () => {
            try {
                const response = await axios.get("/api/user/address", {
                    headers: {
                      authorization: jwtToken,
                    }
                  })
                  dispatch({type:"SET_ADDRESS_DATA", payload:response.data.address})

            }catch (e) {
                console.log(e)
            }
        })()

    }, [])
    return(
        <AddressContext.Provider value = {{ addressState, dispatch }}>
                {children}
        </AddressContext.Provider>
    )
}
export { AddressProvider, useAddress}
