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
    const fileName = "download";
    console.log(floodData);
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data: floodData, fileName, exportType });
  };

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
              Home{" "}
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
