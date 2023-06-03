import React, { useState } from 'react'
import dataContext from './datacontext'
const ContextProvider = (props) => {
    // const [isSideBarOpen,setIsSideBarOpen]=useState(false)
    // const [countryData,setCountryData]= useState(null)
    // const [floodData,setFloodData]=useState([])
    // const [queryParams,setQueryParams]=useState([])
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedFlood, setSelectedFlood] = useState([]);
    const[pop, setPop]=useState(false)
      return (
        <div>
          <dataContext.Provider value={{ sidebarOpen, setSidebarOpen,selectedFlood, setSelectedFlood,pop, setPop }} >
            {props.children}
          </dataContext.Provider>
        </div>
      )
    }
    
    export default ContextProvider
    