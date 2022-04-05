import React from 'react'
import { Link } from 'react-router-dom';
import { useProductContext } from "../../context/context-index"


const Category = () => {
    
    const { state, dispatch } = useProductContext()
    const catMenProducts = () => {
        dispatch({type:"CAT_MEN", payload:"catMen"})
        if(state.filter.category.women){
            dispatch({type:"CAT_WOMEN", payload:"Women"})
        }
        if(state.filter.category.kids){
            dispatch({type:"CAT_KIDS", payload:"Kids"})
        }
    }
    const catWomenProducts = () => {
        dispatch({type:"CAT_WOMEN", payload:"catWomen"})
        if(state.filter.category.men){
            dispatch({type:"CAT_MEN",payload:"Men"})
        }
        if(state.filter.category.kids){
            dispatch({type:"CAT_KIDS", payload:"Kids"})
        }
    }
    const catKidsProducts = () => {
        dispatch({type:"CAT_KIDS", payload:"catKids"})
        if(state.filter.category.men){
            dispatch({type:"CAT_MEN",payload:"Men"})
        }
        if(state.filter.category.women){
            dispatch({type:"CAT_WOMEN", payload:"Women"})
        }
    }
  return (
    <div className="home-cat-wrapper">
        <Link to = "/products" className="cat-card-wrapper">
            <div onClick = {catMenProducts}>
                <img src = "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt = "Men Category" className="cat-card-img"/>
                <p>Men</p>
            </div>
        </Link>
        <Link to = "/products"className="cat-card-wrapper">
            <div onClick = {catWomenProducts}>
                <img src = "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80" alt = "Women Category" className="cat-card-img"/>
                <p>Women</p>
            </div>
        </Link>
        <Link to = "./products" className="cat-card-wrapper">
            <div onClick = {catKidsProducts}>
                <img src = "https://media.istockphoto.com/photos/happy-curly-boy-laughing-and-holding-skateboard-picture-id1124742827?b=1&k=20&m=1124742827&s=170667a&w=0&h=FjLMBTxiZOhJB45V-L3pm_tYC4dYqHyTD2e_nRJN5LE=" alt = "Kids Category" className="cat-card-img"/>
                <p>Kids</p>
            </div>
        </Link>
        <Link to = "./products" className="cat-card-wrapper">
            <div>
                <img src = "https://media.istockphoto.com/photos/living-room-interior-mock-up-modern-furniture-and-trendy-home-on-picture-id1277609544?b=1&k=20&m=1277609544&s=170667a&w=0&h=twZPxv091nG7Yv9hZKTfO3Xc2iW_49C5_ciHxFY3vwk=" alt = "Home Category" className="cat-card-img"/>
                <p>Home</p>
            </div>
        </Link>
        <Link to = "./products" className="cat-card-wrapper">
            <div>
                <img src = "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFrZXVwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt = "beauty Category" className="cat-card-img"/>
                <p>Beauty</p>
            </div>
        </Link>
        
      </div>
  )
};

export default Category;
