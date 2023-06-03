import { useState, useContext, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./Sidebar.css";
import { IoCaretDownSharp } from "react-icons/io5";
import dataContext from "../../context/datacontext";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SpecificFlooddata from "../SpecificFlooddata/SpecificFlooddata";

function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useContext(dataContext);
  const [floodData, setFloodData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openPanel, setopenPanel] = useState(false);
  const [select, setSelect] = useState("Countries");
  const { countryData, setCountryData } = useContext(dataContext);
  const [queryParams, setQueryParams] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [show, setShow] = useState(false);
  const {selectedFlood, setSelectedFlood} = useContext(dataContext);
  const {pop,setPop}=useContext(dataContext)

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
  useEffect(() => {
    console.log(queryParams);
  }, [queryParams]);
  const fetchData = async () => {
    const url = `http://localhost:7000/api/floods/testing8?sDate=2016-04-04&eDate=2017-04-04&CountryName=India&SatelliteName=${
      queryParams[0] ? queryParams[0] : ""
    }&SatelliteName1=${queryParams[1] ? queryParams[1] : ""}&SatelliteName2=${
      queryParams[2] ? queryParams[2] : ""
    }&SatelliteName3=${queryParams[3] ? queryParams[3] : ""}&SatelliteName4=${
      queryParams[4] ? queryParams[4] : ""
    }`;
    console.log(url);
    const data = await fetch(url);
    console.log("object");
    const rep = await data.json();
    console.log(rep);
    setFloodData(rep);
    setIsSubmitted(true);
  };
  const handleClick = () => {
    fetchData();
    setQueryParams(selectedValues);
  };

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
    console.log("hfjhfj")
    setPop(true);

  };
  useEffect(()=>{
      console.log(selectedFlood)
  },[selectedFlood])
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
  useEffect(() => {
    console.log(selectJson);
  }, [selectJson]);
  return (
    <>
      {pop ? <SpecificFlooddata flooddata={selectedFlood?.flooddata}/>:<></>}
      <Offcanvas
        show={sidebarOpen}
        onHide={handleClose}
        scroll={true}
        backdrop={false}
        className="offcanvas-custom"
      >
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          {isSubmitted ? (
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
              
                
              
              {/* <Modal show={show} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>{selectedFlood?.flooddata.map((e)=>{
          return <SpecificFlooddata flooddata={e}/>
        })}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose1}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
            </>
          ) : (
            <>
              <ul className="nav-menu-items">
                <li className="navbar-toggle">
                  <button>Query</button>

                  <button>Data</button>

                  <button>Links</button>
                </li>

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
                    className="dropdown-btn"
                    onClick={(e) => setopenPanel(!openPanel)}
                  >
                    {select}
                    <span>
                      <IoCaretDownSharp style={{ color: "black" }} />
                    </span>
                  </div>
                  {openPanel && (
                    <div className="dropdown-content">
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
                {/* {floodData?.length > 1 ? (
              floodData.map((e, index) => {
                return (
                  <>
                    <ul>
                      <li key={e.id}>
                        <div>{e.CountryName}</div>
                        <div>{e.floodname}</div>
                      </li>
                    </ul>
                  </>
                );
              })
            ) : (
              <div style={{ color: "black" }}>Loading ...</div>
            )} */}
              </ul>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
