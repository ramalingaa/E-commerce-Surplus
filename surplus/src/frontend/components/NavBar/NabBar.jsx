import { useState } from "react"
import {useProductContext, useAuthContext } from "../../context/context-index"
import { Link, useNavigate  } from "react-router-dom"
import { UserProfile } from "../index-components"

export default function Navbar() {

  const [profileDisplay, setProfileDisplay] = useState(false)
    const { state, dispatch } = useProductContext()
    const { cartCounter, wishCounter } = state
    const  navigate  = useNavigate()
    const { jwtToken } = useAuthContext()
    
   
    const toggleProfileCard = () => {
      setProfileDisplay((prev) => !prev)
    }
    return (
      <nav className="navbar ">
        <div>
          <Link to = "/">
              <div href="../index.html" className="navbar-logo">
                  <i className="fas fa-meteor nav-logo"></i>
                  <h2>Surplus</h2>
              </div>
          </Link>
        </div>
        <div className="navbar-search">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            className="i-text navbar-input-search"
            placeholder="Search for products, brands and more"
            onChange = {(e) => dispatch({type:"SEARCH_FILTER", payload:e.target.value})} onKeyPress={(e) => e.key === "Enter" && navigate("/Product")}/>
        </div>
        <div className="navbar-cart">
          
            {jwtToken ? <button onClick = {toggleProfileCard}><i className="far fa-user nav-icon"></i></button> : <Link to = "/Login"><button className="btn primary">Login</button></Link>}
            {profileDisplay && <UserProfile setProfileDisplay = {setProfileDisplay}/>}
          
            <Link to = {jwtToken ? "/Wishlist" :"/Login"} ><div className="page-links wish-list">Wishlist
              <i className="far fa-heart nav-icon wish-icon"></i> {jwtToken && <p className="wish-counter">{wishCounter}</p>}
              </div>
            </Link>
            <Link to = {jwtToken ? "/Cart" :"/Login"} >
              <div className="page-links cart-icon">Cart 
               <i className="fas fa-cart-plus nav-icon "></i> {jwtToken && <p className="wish-counter">{cartCounter}</p>}
               </div>
            </Link>
        </div>
      </nav>
    );
  }
  