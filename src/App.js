import "./App.css";
import { Routes, Route} from "react-router-dom"

import { Navbar, Home, Product, Login, Signup, ForgotPassword } from "./frontend/components/index-components"
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

      </Routes>
    </div>
  );
}

export default App;
