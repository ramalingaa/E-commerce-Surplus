import { createContext, useContext, useReducer, useEffect } from 'react';
import { addressReducer } from "./product-context-function/addressReducer"
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useAuthContext } from "./context-index"

const AddressContext = createContext()
const useAddress = () => useContext(AddressContext)


const AddressProvider = ({children}) => {
    const { jwtToken } = useAuthContext()
    const [addressState, dispatch] = useReducer(addressReducer, {address:[],coupon:"", finalPrice:0})
   
    useEffect(() => {
      
      if(jwtToken){
        (async ()=>{
          const defaultAddress = {
            name: "Ramalinga",
            mobile: "9985444555",
            pincode: "500078",
            address: "Vendath road, Ashok Nager",
            locality: "Koti",
            district:"Hyderabad",
            state:"Telangana"
          };
             
          try {   
                const serverResponse = await axios.post("/api/user/address",{product:{...defaultAddress, _id:uuid()}}, {
                  headers: {
                    authorization: jwtToken,
                  }
                })
                dispatch({type:"SET_ADDRESS_DATA", payload:serverResponse.data.address})
              }
          catch(e){
                  console.log("data uploading failed")
          }
        })()
      }

    }, [])
    return(
        <AddressContext.Provider value = {{ addressState, dispatch }}>
                {children}
        </AddressContext.Provider>
    )
}
export { AddressProvider, useAddress}
