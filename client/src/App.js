import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "./bricks/utils/LanguageSwitch";
import { useState } from "react";
import DarkModeToggle from "./bricks/utils/DarkModeToggle";

function App() {
  const [isDark, setIsDark] = useState(false);
  let navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Navbar fixed="top" expand={"sm"} bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand
            onClick={() => navigate("/")}
            style={{ color: "var(--yellow-color)" }}
          >
            {t("appTitle")}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                {t("shoppingLists")}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav
                variant="underline"
                defaultActiveKey="/"
                className="justify-content-end flex-grow-1 pe-3 align-items-center"
              >
                <DarkModeToggle
                  isChecked={isDark}
                  handleChange={() => setIsDark(!isDark)}
                />
                <LanguageSwitch />
                <Nav.Link onClick={() => navigate("/")}>{t("home")}</Nav.Link>
                <Nav.Link onClick={() => navigate("/shoppingLists")}>
                  {t("shoppingLists")}
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
