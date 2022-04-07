import React, { useState } from 'react'
import axios from "axios"
import { useNavigate, Link } from "react-router-dom";



const Signup = () => {

    const [showPassword, setShowPassword] = useState({password:false, reEnterPassword:false})
    const [isPasswordMatch, setISPasswordMatch] = useState(true)
    const [error, setError] = useState({emailExist:false,blankError: false, otherError:false})

    const [newUserData, setNewUserData] = useState({email:"", password:"",name:""})
    const navigate  = useNavigate()

    const toggleDisplayPassword = () => {
        setShowPassword((prev) => ({...prev, password:!(prev.password)}))
    }
    const toggleReDisplayPassword = () => {
        setShowPassword((prev) => ({...prev, reEnterPassword:!(prev.reEnterPassword)}))
    }
    const updateNewUserData = (e) => {
        const { name } = e.target
        setNewUserData((prev) => ({...prev, [name]: e.target.value}))
    }
    const checkPassword = (e) => {
        newUserData.password === e.target.value ? setISPasswordMatch(() => true) : setISPasswordMatch(() => false)
    }
    const signupUser = async () => {
        if(newUserData.email && newUserData.password && newUserData.name){
            try {
                const response = await axios.post("/api/auth/signup",newUserData)
                if(response.status === 201){
                    navigate("/login")
                }
                
            }catch (e){
                if(e?.response){
                    e.response.status === 422 && setError((prev) => ({emailExist:true,blankError: false, otherError:false}))
                    e.response.status === 500 && setError((prev) => ({emailExist:false,blankError: false, otherError:true}))
                }
                
            }
        }
        else {
            setError((prev) => ({emailExist:false,blankError: true, otherError:false}))
        }
    }
    

  return (
    <div className = "login-page-wrapper">
        <div className = "login-card-wrapper">
            <p className = "text-large login-header">Signup</p>
            <label className = "input-label">
                <input type = "text" placeholder = " " name = "name"className = "i-text input-name login-input" onChange = {updateNewUserData}/>
                <span className = "input-placeholder">Full Name</span>
            </label>
            <label className = "input-label">
                <input type = "email" placeholder = " "  name = "email"className = "i-text input-name login-input" onChange = {updateNewUserData}/>
                <span className = "input-placeholder">Email Address</span>
            </label>
            <label className = "input-label password-wrapper">
                <input type = {showPassword.password ? "text" : "password"} name = "password" placeholder = " " className = "i-text input-name login-input" onChange = {updateNewUserData}/>
                <span  className = "input-placeholder">Password</span>
                <button className = "show-password" onClick = {toggleDisplayPassword}>{showPassword.password ? <i className="fas fa-eye "></i> : <i className="fas fa-eye-slash"></i>}</button>
                
            </label>
            <label className = "input-label password-wrapper">
                <input type = {showPassword.reEnterPassword ? "text" : "password"} placeholder = " " className = "i-text input-name login-input" onChange = {checkPassword}/>
                <span  className = "input-placeholder">Confirm Password</span>
                <button className = "show-password" onClick = {toggleReDisplayPassword}>{showPassword.reEnterPassword ? <i className="fas fa-eye "></i> : <i className="fas fa-eye-slash"></i>}</button>
                {!isPasswordMatch && <p className = "login-forgotPassword">Passwords don't match</p>}
            </label>
            {error.emailExist && <p className = "login-forgotPassword">The email you entered is already Exists.</p>}
            {error.otherError && <p className = "login-forgotPassword">Something went wrong.</p>}
            {error.blankError && <p className = "login-forgotPassword">Please fill in required details.</p>}
            <button className = "btn primary" onClick = {signupUser}>Signup</button>
            <Link to = "/login" className = "login-header create-account">Already Have an Account? Login</Link>
        </div>
    </div>
  )
};

export default Signup;