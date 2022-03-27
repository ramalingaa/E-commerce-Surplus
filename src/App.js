import "./App.css";
import { Routes, Route} from "react-router-dom"

import { Navbar, Home, Product, Login, Signup, ForgotPassword, Wishlist } from "./frontend/components/index-components"
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path = "/" element = {<Home />}/>
        <Route path = "/products" element = {<Product />}/>
        <Route path = "/login" element = {<Login />}/>
        <Route path = "/signup" element = {<Signup />}/>
        <Route path = "/resetpassword" element = {<ForgotPassword />}/>
        <Route path = "/wishlist" element = {<Wishlist />}/>

      </Routes>
    </div>
  );
}

export default App;
