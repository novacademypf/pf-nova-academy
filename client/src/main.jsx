import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3001/'   //Definimos url por defecto para modificar en deploy donde se colocara la ruta de front donde realicemos deploy 




ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="50733054185-1gaasavkm9laqosq23fv4qpv3ov62fgu.apps.googleusercontent.com">
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </GoogleOAuthProvider>
);
