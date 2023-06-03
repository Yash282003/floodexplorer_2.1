import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Route, Switch } from "react-router-dom";
import NavbarMenu from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Map from "../../components/Map/Map"

function Home() {
  return (
    <div>
     <NavbarMenu/>
     <Sidebar/>
     <Map/>
    </div>
  );
}

export default Home;
