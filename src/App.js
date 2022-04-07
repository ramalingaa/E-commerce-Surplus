import "./App.css";
import { Routes, Route, Navigate} from "react-router-dom"
import { Navbar, Home, Product, Login, Signup, ForgotPassword, Wishlist, Cart, Address, SingleProductCard, OrderConfirmation, ErrorPage } from "./frontend/components/index-components"
import MockAPI from "./MockMan";
import { useAuthContext } from "./frontend/context/context-index";


function App() {
  const { jwtToken } = useAuthContext()
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path = "/" element = {<Home />}/>
        <Route path = "/products" element = {<Product />}/>
        <Route path = "/login" element = {jwtToken ? <Navigate to = "/products" />: <Login />}/>
        <Route path = "/signup" element = {jwtToken ?  <Navigate to = "/products" />: <Signup />}/>
        <Route path = "/resetpassword" element = { jwtToken ? <Navigate to = "/products" /> : <ForgotPassword />}/>
        <Route path = "/wishlist" element = {<Wishlist />}/>
        <Route path = "/cart" element = {<Cart />}/>
        <Route path = "/address" element = {<Address />}/>
        <Route path = "/products/:productId" element = {<SingleProductCard />}/>
        <Route path = "/MockMan" element = {<MockAPI />}/>
        <Route path = "/orderconfirm" element = {< OrderConfirmation/>}/>
        <Route path = "*" index element = {< ErrorPage />} />

      </Routes>
    </div>
  );
}

export default App;
