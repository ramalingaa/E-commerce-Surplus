import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import {  AuthProvider, ProductProvider} from './frontend/context/context-index';
import {BrowserRouter as Router} from "react-router-dom"

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ProductProvider>
            <App />
        </ProductProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
