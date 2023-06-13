import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import dataContext from "../../context/datacontext";
import { Link, useLocation } from "react-router-dom";
import exportFromJSON from "export-from-json";
import "./Navbar.css";

function NavbarMenu() {
  const { sidebarOpen, setSidebarOpen } = useContext(dataContext);
  const { startDate, setStartDate } = useContext(dataContext);
  const { endDate, setEndDate } = useContext(dataContext);
  const { floodData, setFloodData } = useContext(dataContext);

  const { select, setSelect } = useContext(dataContext);
  const location = useLocation();
  const isTwitterPage = location.pathname === "/twitter";

  const handleShow = () => {
    setSidebarOpen(true);
  };

  const onExportRemoteData = () => {
    // const downloadDataUrl = isTwitterPage
    //   ? `${process.env.REACT_APP_BASE_URL}/tweets?sDate=${convertToDateGoing(
    //       startDate
    //     )}&eDate=${convertToDateGoing(endDate)}`
    //   : `${process.env.REACT_APP_BASE_URL}/api/floods/testing8?sDate=${startDate}&eDate=${endDate}&CountryName=${select}`;

    // fetch(downloadDataUrl)
    //   .then((resp) => resp.json())
    //   .then((response) => {
        const fileName = "download";
        console.log(floodData);
        const exportType = exportFromJSON.types.csv;

        exportFromJSON({ data: floodData, fileName, exportType });
      // });
      
  };

  function convertToDateGoing(dateString) {
    if (!dateString) {
      return ""; // Return an empty string or handle the null/undefined case accordingly
    }
  
    var parts2 = dateString.split("-");
    var day2 = parts2[2];
    var month2 = parts2[1];
    var year2 = parts2[0];
    var dateObj2 = day2 + "-" + month2 + "-" + year2;
    console.log(dateObj2);
    return dateObj2;
  }
  

  return (
    <Navbar
      bg="light-"
      expand="lg"
      style={{ backgroundColor: "rgb(189, 187, 187)" }}
    >
      <Container>
        <Navbar.Brand href="#home">FLOOD_EXPLORER</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" as={Link} to="/">
              {" "}
              About{" "}
            </Nav.Link>
            <Nav.Link href=""> Tools </Nav.Link>
            <Nav.Link href="" onClick={onExportRemoteData}>
              Download
            </Nav.Link>
            <Nav.Link href="" as={Link} to="/twitter">
              Twitter
            </Nav.Link>
            <Nav.Link href="" onClick={handleShow}>
              QueryData
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;
