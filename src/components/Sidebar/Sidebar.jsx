import { useState, useContext, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./Sidebar.css";
import { IoCaretDownSharp } from "react-icons/io5";
import dataContext from "../../context/datacontext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SpecificFlooddata from "../SpecificFlooddata/SpecificFlooddata";
import Weblink from "../Weblink/Weblink";
import { useLocation } from "react-router-dom";


function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useContext(dataContext);
  const {startDate, setStartDate} = useContext(dataContext);
    const {endDate, setEndDate} = useContext(dataContext);
  const [openPanel, setopenPanel] = useState(false);
  const {select, setSelect} = useContext(dataContext);
  const { countryData, setCountryData } = useContext(dataContext);
  const [queryParams, setQueryParams] = useState([]);
  const { modelArrays, setModelArrays } = useContext(dataContext);
  const { weblinksview, setWeblinksView } = useContext(dataContext);

  const [viewingSection, setViewingSection] = useState("query");
  const [show, setShow] = useState(false);
  const { floodData, setFloodData } = useContext(dataContext);
  const [url, setUrl] = useState('')
  const { selectedFlood, setSelectedFlood } = useContext(dataContext);
  const { pop, setPop } = useContext(dataContext);
  

  const Option = [
    "India",
    "Bangladesh",
    "Nepal",
    "Indonesia",
    "Japan ",
    "Cambodia",
    "Phillipines",
    "Malaysia",
    "Myanmar",
    "Srilanka",
    "Thailand",
    "Vietnam",
    "Laos",
  ];
  function convertToDateComing(dateString) {
    var parts = dateString.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10) - 1; // Subtract 1 from month since JavaScript Date object months are zero-based
    var year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  function convertToDateGoing(dateString) {
    var parts2 = dateString.split("-");
    var day2 = parseInt(parts2[2], 10);
    var month2 = parseInt(parts2[1], 10) - 1;
    var year2 = parseInt(parts2[0], 10);
    var dateObj2 = new Date(year2, month2, day2);
    return dateObj2;
  }

  function filterWeblinkDataByDateRange(data, sd, ed) {
    console.log(sd, ed);
    console.log(data)
    if(data?.length<2){
      
      var filteredData = data[0]?.weblinkdata?.filter(function (item) {
        var itemsd = convertToDateComing(item.start_date);
        var itemed = convertToDateComing(item.end_date);
        var rangesd = convertToDateGoing(sd);
        var rangeed = convertToDateGoing(ed);
        return itemsd >= rangesd && itemed <= rangeed;
      });

      console.log(filteredData);
      setWeblinksView(filteredData);
    }
    else{
      setWeblinksView(data)
    }
    }

  useEffect(() => {
    console.log(weblinksview);
  }, [weblinksview]);
  useEffect(() => {
    const fetchWeblinks = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_BASE_URL}/weblinks?CountryName=India`
      );
      const data = await result.json();
      console.log(data)
      setWeblinksView(data);
    };
    fetchWeblinks();
  }, []);

  useEffect(()=>{
    setUrl(`${process.env.REACT_APP_BASE_URL}/api/floods/testing8?sDate=${startDate}&eDate=${endDate}&CountryName=${select}&SatelliteName=${
      queryParams[0] ? queryParams[0] : ""
    }&SatelliteName1=${queryParams[1] ? queryParams[1] : ""}&SatelliteName2=${
      queryParams[2] ? queryParams[2] : ""
    }&SatelliteName3=${queryParams[3] ? queryParams[3] : ""}&SatelliteName4=${
      queryParams[4] ? queryParams[4] : ""
    }`)
    console.log(url)
  },[startDate,endDate,queryParams,select])
const fetchData = async () => {


    const data = await fetch(url);

    const rep = await data.json();
    console.log(rep);
    console.log(url)
    setFloodData(rep);
    setViewingSection("data");
    filterWeblinkDataByDateRange(weblinksview, startDate, endDate);
    setQueryParams([])
    setSelect(null)
    setStartDate(null)
    setEndDate(null)
  };
  const handleClick = () => {
    fetchData();
  };
  const parseWeblinks = () => {};
  const handleShow = () => {
    setSidebarOpen(true);
  };

  const handleClose = () => {
    setSidebarOpen(false);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date.target.value);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date.target.value);
  };
  // const handleClose1= () => {
  //   setShow(false);
  //   setSelectedFlood(null);
  // };

  const handleShow1 = (floodName) => {
    console.log(floodName);
    setSelectedFlood(floodName);
    console.log("hfjhfj");
    setPop(true);
  };
  var selectedValues = [];
  function handleParams(event) {
    var clickedElement = event.target;
    var elementValue = clickedElement.value;

    if (clickedElement.checked) {
      // Append the value to the global array if selected
      selectedValues.push(elementValue);
    } else {
      // Remove the value from the global array if unselected
      var index = selectedValues.indexOf(elementValue);
      if (index !== -1) {
        selectedValues.splice(index, 1);
      }
    }
    setQueryParams(selectedValues);

  }
  var selectJson = [];
  function handleGeoJSON(event) {
    var clickedElement = event.target;
    var elementValue = clickedElement.name;
    console.log(elementValue);
    if (clickedElement.checked) {
      // Append the value to the global array if selected
      selectJson.push(elementValue);
    } else {
      // Remove the value from the global array if unselected
      var index = selectJson.indexOf(elementValue);
      if (index !== -1) {
        selectJson.splice(index, 1);
      }
    }

    // Do something else with the value if needed
  }
  const location = useLocation();
  useEffect(() => {
    console.log(selectJson);
  }, [selectJson]);
  if (location.pathname === "/twitter") {
    return null; 
  }
  return (
    <>
    
      {pop ? <SpecificFlooddata flooddata={selectedFlood?.flooddata} /> : <></>}
      <Offcanvas
        show={sidebarOpen}
        onHide={handleClose}
        scroll={true}
        backdrop={false}
        className="offcanvas-custom"
      >
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <li className="navbar-toggle">
            <button onClick={() => setViewingSection("query")}>Query</button>

            <button onClick={() => setViewingSection("data")}>Data</button>

            <button onClick={() => setViewingSection("links")}>Links</button>
          </li>

          {viewingSection === "data" && (
            <>
              <ul className="nav-menu-items">
                {floodData.length > 1 ? (
                  floodData.map((element, index) => (
                    <li key={index}>
                      <div>{element.CountryName}</div>
                      <div
                        onClick={() => handleShow1(element)}
                        style={{ cursor: "pointer" }}
                      >
                        {element.floodname}
                      </div>
                    </li>
                  ))
                ) : (
                  <div style={{ color: "black" }}>No data available</div>
                )}
              </ul>
            </>
          )}
          {viewingSection === "query" && (
            <>
              <ul className="nav-menu-items">
                <div className="search_data">
                  <span>Search Flood Data</span>
                </div>
                <hr />

                <div>
                  <div className="search">
                    <span>Flood Start Date:</span>
                  </div>
                  <div className="datepicker">
                    <input
                      type="date"
                      onChange={(e) => handleStartDateChange(e)}
                    />
                  </div>
                  <div className="search">
                    <span>Flood End Date:</span>
                  </div>
                  {/* <button onClick={fetchData}>afgjhcjdjkdnjd</button> */}
                  <div className="datepicker">
                    <input type="date" onChange={handleEndDateChange} />
                  </div>
                  {/* {floodData.map((nested) =>
                nested.flooddata.map((element) => {
                  return (
                    <>
                      <input
                        type="checkbox"
                        onClick={(e) => {
                          handleGeoJSON(e);
                        }}
                        name={element.footprint}
                        value={element.field1 ? element.field1 : "what"}
                      />
                      {element.field1} <br />
                    </>
                  );
                })
              )} */}
                </div>

                <div className="dropdown">
                  <div
                    className="dropdown-btn1"
                    onClick={(e) => setopenPanel(!openPanel)}
                  >
                    {select}
                    <span>
                      <IoCaretDownSharp style={{ color: "black" }} />
                    </span>
                  </div>
                  {openPanel && (
                    <div className="dropdown-content1">
                      {Option.map((Option) => {
                        return (
                          <div
                            onClick={(e) => {
                              setSelect(Option);
                              setopenPanel(false);
                            }}
                            className="dropdown-item"
                          >
                            {Option}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="search satellite">
                  <span>Optical Satellite Sensor:</span>
                  <br />
                </div>
                <div className="Satellites-info">
                  <input
                    onClick={(e) => handleParams(e)}
                    type="checkbox"
                    id="planet"
                    name="planet"
                    value="Planet"
                  />
                  Planet <br />
                  <input
                    onClick={(e) => handleParams(e)}
                    type="checkbox"
                    id="digital"
                    name="digital"
                    value="Digital-Globe"
                  />
                  Digital Globe <br />
                  <input
                    onClick={(e) => handleParams(e)}
                    type="checkbox"
                    id="sentinel2"
                    name="sentinal2"
                    value="Sentinel-II"
                  />
                  Sentinel-II <br />
                </div>

                <div className="search satellite">
                  <span>SAR Satellite Sensor:</span>
                  <br />
                </div>
                <div className="Satellites-info">
                  <input
                    onClick={(e) => handleParams(e)}
                    type="checkbox"
                    id="alos2"
                    name="also2"
                    value="Alos-II"
                  />
                  ALOS-II <br />
                  <input
                    onClick={(e) => handleParams(e)}
                    type="checkbox"
                    id="sentinel1"
                    name="sentinel1"
                    value="Sentinel-I"
                  />
                  Sentinel-I <br />
                </div>

                <div id="submitbutton">
                  <button
                    type="submit"
                    // onClick={fetchData}
                    // onClick={() => {
                    //   setQueryParams(selectedValues);
                    // }}
                    onClick={handleClick}
                  >
                    Submit
                  </button>
                </div>
              </ul>
            </>
          )}

          {viewingSection === "links" && (
  <div className="links-container">
    {weblinksview?.map((e) => (
      <a href={e.weblink} target="_blank" rel="noopener noreferrer">
        {e.weblink}
      </a>
    ))}
  </div>
)}

        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
