import "./App.css";
import { Routes, Route} from "react-router-dom"
import { Navbar, Home, Product, Login, Signup, ForgotPassword, Wishlist, Cart, Address, SingleProductCard, OrderConfirmation } from "./frontend/components/index-components"
import MockAPI from "./MockMan";

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
        <Route path = "/cart" element = {<Cart />}/>
        <Route path = "/address" element = {<Address />}/>
        <Route path = "/products/:productId" element = {<SingleProductCard />}/>
        <Route path = "/MockMan" element = {<MockAPI />}/>
        <Route path = "/orderconfirm" element = {< OrderConfirmation/>}/>

      </Routes>
    </div>
  );
}

export default App;
