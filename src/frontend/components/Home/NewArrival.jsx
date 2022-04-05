import React from 'react'
import { Link } from 'react-router-dom';

const NewArrival = () => {

  return (
    <div className = "home-newArrival-mainWrapper">
        <strong>New Arrivals</strong>
            <p>Summer Collection</p>
        <div className ="home-newArrival-wrapper"> 
            <Link to = "./products">
                <img src = "https://cdn.pixabay.com/photo/2017/09/18/06/21/man-2760814_960_720.jpg" alt = "New Arrival" className = "newArrival-img"/>
                    
            </Link>
            <Link to = "./products">
                <img src = "https://cdn.pixabay.com/photo/2020/11/24/14/09/man-5772691_960_720.jpg" alt = "New Arrival" className = "newArrival-img"/>             
            </Link>
        </div>
    </div>
  )
};

export default NewArrival;

