import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../assets/cropped_circle_image.png";

const Header = () => {
  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="shadow-sm border-bottom navbar-dark"
      style={{
        background: "linear-gradient(135deg, #000000 0%, #1B4193 100%)",
        minHeight: "80px", // ensures consistent height
      }}
    >
      <div className="container-fluid px-4 d-flex align-items-center justify-content-between">
        {/* Logo + Brand */}
        <div className="d-flex align-items-center">
          <img
            src={Logo}
            alt="Ente Bus Logo"
            className="img-fluid me-2"
            style={{
              height: "60px", // balanced logo size
              width: "60px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <Navbar.Brand
            href="#home"
            className="fw-bold mb-0"
            style={{
              color: "#ffffff",
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              letterSpacing: "1px",
              marginLeft: "10px",
            }}
          >
            Entebus
          </Navbar.Brand>
        </div>

        {/* Nav Links */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link className="text-white fs-5 fw-semibold nav-link-custom" href="#home">
              Home
            </Nav.Link>
            <Nav.Link className="text-white fs-5 fw-semibold nav-link-custom" href="#feature">
              Features
            </Nav.Link>
            <Nav.Link className="text-white fs-5 fw-semibold nav-link-custom" href="#contact">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
