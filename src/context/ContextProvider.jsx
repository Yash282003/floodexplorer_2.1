import React, { useState } from 'react'
import dataContext from './datacontext'
const ContextProvider = (props) => {
    // const [isSideBarOpen,setIsSideBarOpen]=useState(false)
    // const [countryData,setCountryData]= useState(null)
    const [floodData,setFloodData]=useState([])
    const [weblinksview,setWeblinksView]=useState([])
    // const [queryParams,setQueryParams]=useState([])
    const [modelArrays,setModelArrays]= useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedFlood, setSelectedFlood] = useState([]);
    const [startDate, setStartDate]= useState(null);
    const [endDate, setEndDate] = useState(null);
    const [select, setSelect] = useState("Countries");

    const[pop, setPop]=useState(false)
      return (
        <div>
          <dataContext.Provider value={{weblinksview,setWeblinksView, modelArrays,setModelArrays,floodData,setFloodData,sidebarOpen, setSidebarOpen,selectedFlood, setSelectedFlood,pop, setPop ,startDate, setStartDate,endDate, setEndDate,select, setSelect}} >
            {props.children}
          </dataContext.Provider>
        </div>
      )
    }
    
    export default ContextProvider
    