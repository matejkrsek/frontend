import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap style

function Home() {
  let navigate = useNavigate();

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
        // backgroundColor: "lightyellow",
        backgroundColor: "lightyellow",
      }}
    >
      <div>
        Welcome to the n.1 shopping lists application on the planet. If you
        would like to get more information about any shopping list, feel free to
        follow here{" "}
      </div>

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
        Shopping Lists
      </Nav.Link>
      <br></br>
      <br></br>
      <div style={{ fontStyle: "italic" }}>
        aplikace se chová, jako by byl přihlášen uživatel "Manila" v kódu jako
        proměnná loggedUser
      </div>
    </div>
  );
}

export default Home;
