import React, { useState } from "react";
import dataContext from "./datacontext";
const ContextProvider = (props) => {

  const [floodData, setFloodData] = useState([]);
  const [weblinksview, setWeblinksView] = useState([]);
  const [center, setCenter] = useState([22.9074872, 79.07306671]);
  const [modelArrays, setModelArrays] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFlood, setSelectedFlood] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [select, setSelect] = useState("Countries");

  const [pop, setPop] = useState(false);
  return (
    <div>
      <dataContext.Provider
        value={{
          weblinksview,
          center,
          setCenter,
          setWeblinksView,
          modelArrays,
          setModelArrays,
          floodData,
          setFloodData,
          sidebarOpen,
          setSidebarOpen,
          selectedFlood,
          setSelectedFlood,
          pop,
          setPop,
          startDate,
          setStartDate,
          endDate,
          setEndDate,
          select,
          setSelect,
        }}
      >
        {props.children}
      </dataContext.Provider>
    </div>
  );
};

export default ContextProvider;
