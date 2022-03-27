import { createContext, useContext, useState, useEffect } from "react"
const AuthContext = createContext({})
const useAuthContext = () => useContext(AuthContext)

const AuthProvider = ({children}) => {
    const token = localStorage.getItem("JWT_TOKEN")
    const user = localStorage.getItem("USER_PROFILE")
    const [ userProfileData, setUserProfileData] = useState(() =>{
        if(user){
            return JSON.parse(user);
        }else {
            return {}
        }
    })
    const [jwtToken, setJwtToken] = useState(() => {if(token){
        return token;
    }
    return ""}
    )

    const [ toastDisplay, setToastDisplay ] = useState({ added: false, removed: false })
  
    const [ cartToast, setCartToast ] = useState({ added: false, removed: false })

  useEffect(() => {
    if(toastDisplay.added){
      setTimeout(() => setToastDisplay((prev) => ({...prev, added:!prev.added})), 500)
    }
    if(toastDisplay.removed){
      setTimeout(() => setToastDisplay((prev) => ({...prev, removed:!prev.removed})), 500)
    }

  },[toastDisplay.added, toastDisplay.removed])

  useEffect(() => {
    if(cartToast.added){
      setTimeout(() => setCartToast((prev) => ({...prev, added:!prev.added})), 500)
    }
    if(cartToast.removed){
      setTimeout(() => setCartToast((prev) => ({...prev, removed:!prev.removed})), 500)
    }

  },[cartToast.added, cartToast.removed])

    return (
        <AuthContext.Provider value = {{jwtToken, setJwtToken, setUserProfileData, userProfileData, toastDisplay, setToastDisplay, cartToast, setCartToast}} >
            {children}
        </AuthContext.Provider>
    )
}
export { AuthProvider, useAuthContext}