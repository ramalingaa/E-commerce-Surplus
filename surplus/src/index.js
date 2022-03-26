import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {  AuthProvider, ProductProvider} from './frontend/context/context-index';
import {BrowserRouter as Router} from "react-router-dom"
import { makeServer } from "./server";

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
  
    
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
