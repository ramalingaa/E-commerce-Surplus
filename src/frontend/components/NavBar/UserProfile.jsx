import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../context/context-index'
import { useClickOutside } from '../../customeHooks/useClickOutside';

const UserProfile = ({setProfileDisplay}) => {
    const { userProfileData, setJwtToken } = useAuthContext()
    const  navigate  = useNavigate()

    const logoutUser = () => {
        localStorage.removeItem("surplus")
        setJwtToken(() => "")
        setProfileDisplay((prev) => !prev)
        navigate("/Login")
        
      }
  const clickOutSide = useClickOutside(setProfileDisplay)
  return (
    <div className = "profile-card-wrapper" ref = {clickOutSide}>
        <p>Hello <strong>{userProfileData.firstName}</strong></p>
        <button className="btn outlined" onClick = {logoutUser}>Logout</button>
    </div>
  )
};

export default UserProfile;
