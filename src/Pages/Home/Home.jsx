import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Sidebar from "../../components/Sidebar/Sidebar";
import Map from "../../components/Map/Map";

function Home() {
  return (
    <div>
      <Sidebar/>
      <Map />
    </div>
  );
}

export default Home;
