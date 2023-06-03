import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
// import ContextProvider from './ContextProvider';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <ContextProvider> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>

    {/* </ContextProvider> */}
  </React.StrictMode>
);
