import { createContext, useContext, useState } from "react"
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
    
    return (
        <AuthContext.Provider value = {{jwtToken, setJwtToken, setUserProfileData, userProfileData}} >
            {children}
        </AuthContext.Provider>
    )
}
export { AuthProvider, useAuthContext}