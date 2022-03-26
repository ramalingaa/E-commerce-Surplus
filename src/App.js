import "./App.css";
import { Routes, Route} from "react-router-dom"

import { Navbar, Home } from "./frontend/components/index-components"
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path = "/" element = {<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
