import React from 'react'
import { useContext } from 'react';
import dataContext from '../../context/datacontext';
const Weblink = () => {
    const {weblinksview,setWeblinksView } = useContext(dataContext);
    
    //   console.log(filterWeblinkDataByDateRange(weblinksview,"2016-04-04","2020-04-04"))
  return (
    <div>
      
    </div>
  )
}

export default Weblink
