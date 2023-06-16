import React from "react";
import Home from "./Pages/Home/Home";
import ContextProvider from "./context/ContextProvider";
import { Routes, Route } from "react-router-dom";
import Twitter from "./Pages/Twitter/Twitter";
import NavbarMenu from "./components/Navbar/Navbar";
function App() {
  return (
    <div>
      <ContextProvider>
      <NavbarMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/twitter" element={<Twitter />} />
      </Routes>
      </ContextProvider>
    </div>
  );
}

export default App;
