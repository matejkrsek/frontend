import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap style
import { useTranslation } from "react-i18next";

function Home() {
  let navigate = useNavigate();
  let { t } = useTranslation();

  const handleNavLinkClick = () => {
    navigate("/shoppingLists");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // Adjusted to top-align content
        alignItems: "center",
        height: "100vh", // Full viewport height
        fontWeight: "bold",
        fontSize: "larger",
        paddingTop: "20vh", // Added margin-top to move the content to the top quarter
        backgroundColor: "var(--yellow-color)",
      }}
    >
      <div>{t("welcomeText")}</div>

      <br></br>
      <Nav.Link
        onClick={handleNavLinkClick}
        onMouseEnter={(e) => e.target.classList.add("text-primary")}
        onMouseLeave={(e) => e.target.classList.remove("text-primary")}
        style={{
          textDecoration: "underline",
          fontSize: "x-large",
        }}
      >
        {t("shoppingLists")}
      </Nav.Link>
      <br></br>
      <br></br>
      <div style={{ fontSize: "small", fontStyle: "italic" }}>
        aplikace se chová, jako by byl přihlášen uživatel "Manila" v kódu jako
        proměnná loggedUser
      </div>
    </div>
  );
}

export default Home;
