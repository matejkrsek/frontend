import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";

function App() {
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar fixed="top" expand={"sm"} bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/")} style={{ color: "red" }}>
            The world n. 1 shopping lists application
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                Shopping lists
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav
                variant="underline"
                defaultActiveKey="/"
                className="justify-content-end flex-grow-1 pe-3"
              >
                <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                <Nav.Link onClick={() => navigate("/shoppingLists")}>
                  Shopping lists
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
