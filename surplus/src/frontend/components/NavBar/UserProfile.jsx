import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/context-index'

export default function UserProfile({setProfileDisplay}) {
    const { userProfileData, setJwtToken } = useAuthContext()
    const  navigate  = useNavigate()

    const logoutUser = () => {
        localStorage.removeItem("JWT_TOKEN")
        localStorage.removeItem("USER_PROFILE")
        setJwtToken(() => "")
        setProfileDisplay((prev) => !prev)
        navigate("/Login")
        
      }
  return (
    <div className = "profile-card-wrapper">
        <p>Hello <strong>{userProfileData.firstName}</strong></p>
        <p>Orders</p>
        <p>Contact Us</p>
        <button className="btn outlined" onClick = {logoutUser}>Logout</button>
    </div>
  )
}
