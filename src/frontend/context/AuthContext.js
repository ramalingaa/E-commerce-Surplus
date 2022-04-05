import { createContext, useContext, useState, useEffect } from "react"
const AuthContext = createContext({})
const useAuthContext = () => useContext(AuthContext)

const AuthProvider = ({children}) => {

    const token = JSON.parse(localStorage.getItem("surplus"))
    const [ userProfileData, setUserProfileData] = useState(token?.USER_PROFILE_ECOM)
    const [jwtToken, setJwtToken] = useState(token?.JWT_TOKEN_ECOM)

    const [ toastDisplay, setToastDisplay ] = useState({ added: false, removed: false })
  
    const [ cartToast, setCartToast ] = useState({ added: false, removed: false })

  useEffect(() => {
    if(toastDisplay.added){
      setTimeout(() => setToastDisplay((prev) => ({...prev, added:!prev.added})), 3000)
    }
    
  },[toastDisplay.added])
  useEffect(() => {
    
    if(toastDisplay.removed){
      setTimeout(() => setToastDisplay((prev) => ({...prev, removed:!prev.removed})), 3000)
    }
  },[toastDisplay.removed])

  useEffect(() => {
    if(cartToast.added){
      setTimeout(() => setCartToast((prev) => ({...prev, added:!prev.added})), 3000)
    }
   
  },[cartToast.added])
  useEffect(() => {
    if(cartToast.removed){
      setTimeout(() => setCartToast((prev) => ({...prev, removed:!prev.removed})), 3000)
    }

  },[cartToast.removed])

    return (
        <AuthContext.Provider value = {{jwtToken, setJwtToken, setUserProfileData, userProfileData, toastDisplay, setToastDisplay, cartToast, setCartToast}} >
            {children}
        </AuthContext.Provider>
    )
}
export { AuthProvider, useAuthContext}