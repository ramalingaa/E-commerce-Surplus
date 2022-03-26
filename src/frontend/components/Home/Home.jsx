import React from 'react'
import { Category, HeroSection, NewArrival} from '../index-components'

const Home = () => {
  return (
    <div className = "home-main-wrapper">
      <Category />
      <HeroSection />
      <NewArrival />
    </div>
  )
}

export default Home