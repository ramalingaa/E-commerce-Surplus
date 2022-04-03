import axios from 'axios'
import React from 'react'
import { useState } from "react"
import { useAuthContext } from '../../context/context-index'
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
    const [rememberMe, setRememberMe] = useState(false)
    const [userData, setUserData] = useState({email:"", password:""})
    const { setJwtToken, setUserProfileData } = useAuthContext()
    const navigate = useNavigate() 
    const updateUserData = (e) => {
        const { name } = e.target
        setUserData((prev) => ({...prev, [name]:e.target.value}))
    }
    const loginUser = async () => {

        try {
            const response = await axios.post("/api/auth/login",userData)
            
            setJwtToken(() =>response.data.encodedToken)
            setUserProfileData(() =>response.data.foundUser )
            navigate("/products")
            if(rememberMe){
                localStorage.setItem("JWT_TOKEN",response.data.encodedToken)
                localStorage.setItem("USER_PROFILE",JSON.stringify(response.data.foundUser))
            }

        }catch(e) {
            console.log(e)
        }
    }
    const loginGuest = async () => {

        try {
            const guestData = {email:"ramalinga.kalagotla@gmail.com", password:"123456"}
            const response = await axios.post("/api/auth/login",guestData)
            if(rememberMe){
                localStorage.setItem("JWT_TOKEN",response.data.encodedToken)
                localStorage.setItem("USER_PROFILE",JSON.stringify(response.data.foundUser))
            }
            setJwtToken(() =>response.data.encodedToken)
            setUserProfileData(() =>response.data.foundUser )
            navigate("/products")

        }catch(e) {
            console.log(e)
        }
    }
    const rememberHandler = () => {
        setRememberMe((prev) => !prev)
    }
  return (
    <div className = "login-page-wrapper">
        <div className = "login-card-wrapper">
            <p className = "text-large login-header">Login</p>
            <label className = "input-label">
                <input type = "email" placeholder = " " name = "email"className = "i-text input-name login-input" onChange = {updateUserData}/>
                <span className = "input-placeholder">Email Address</span>
            </label>
            <label className = "input-label">
                <input type = "password" placeholder = " " name = "password" className = "i-text input-name login-input" onChange = {updateUserData}/>
                <span  className = "input-placeholder">Password</span>
            </label>
            <div className = "rememberMe-wrapper">
                <label><input type = "checkbox" className = "remember-checkbox" onChange = {rememberHandler}/>Remember me</label>
                <Link to = "/resetLinkassword"className = "login-forgotLinkassword">Forgot password ?</Link>
            </div>
            <button className = "btn primary" onClick = {loginUser}>Login</button>
            <button className = "btn outlined" onClick = {loginGuest}>Login as a Guest</button>
            <Link to = "/signup"><p className = "login-header create-account">Create new Account</p></Link>
        </div>
    </div>
  )
}
