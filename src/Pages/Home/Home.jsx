import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Routes, Route } from "react-router-dom";
import NavbarMenu from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Map from "../../components/Map/Map";
import Twitter from "../../Pages/Twitter/Twitter";

function Home() {
  return (
    <div>
      <NavbarMenu />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/twitter" element={<Twitter />} />
      </Routes>
    </div>
  );
}

export default Home;
