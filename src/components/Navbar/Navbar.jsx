import {useContext} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import dataContext from "../../context/datacontext";
import NavDropdown from "react-bootstrap/NavDropdown";
// import { AiFillQuestionCircle } from "react-icons/ai";
// import { BsGlobeEuropeAfrica } from "react-icons/bs";
// import { IoMdCloudDownload } from "react-icons/io";
import "./Navbar.css";

import { IoLogoTwitter } from "react-icons/io";

function NavbarMenu() {
  const { sidebarOpen, setSidebarOpen } = useContext(dataContext);
  const handleShow = () => {
    setSidebarOpen(true);
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
            <Nav.Link href="#home"> About </Nav.Link>
            <Nav.Link href="#link"> Tools </Nav.Link>
            <Nav.Link href="#link">Download </Nav.Link>
            <Nav.Link href="#link">Twitter</Nav.Link>
            <Nav.Link href="#link" onClick={handleShow}>QueryData</Nav.Link>
            {/* <NavDropdown
              title="Query"
              id="basic-nav-dropdown"
              className="query-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>

              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;
