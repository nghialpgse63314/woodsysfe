import "bootstrap/dist/css/bootstrap.min.css";
// import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { } from "react";
// import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Logo from "../assets/images/wologo.png";
import Add from "../components/adddata";
import CreateAccount from "../components/createAccounts";
import AddTicket from "../components/deliveryTicket";
import ReadOrders from "../components/orderandordedetail";
import UpdateRead from "../components/read";
import ReadAccount from "../components/readAccounts";
import ReadTickets from "../components/readTicket";
import UpdateWrite from "../components/updateWrite";
import { auth } from "../config/firebase";
import Home from "./home";
import Login from "./login";
import Manager from "./manager";
import PaginationComponent from "./pagination";
import Product from "./product";
import ProfilePage from "./profile";
import Signup from "./signup";
import ReadStatistic from "./statistic";
function NavBar() {
  //get current user
  const [user, setUser] = useState({});
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, [user]);



  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen(!open);
  };
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid style={{ backgroundColor: "white" }}>
          <Navbar.Brand href="#home" style={{ fontSize: "20px" }}>
            <img
              alt="logo"
              src={Logo}
              width="100%"
              height={75}
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse
            id="navbarScroll"
            style={{ fontSize: "19px", fontWeight: "bold" }}
          >
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">Trang chủ</Nav.Link>
              <Nav.Link href="/product">Sản phẩm</Nav.Link>
              <Nav.Link href="#">Tư vấn</Nav.Link>
              <NavDropdown
                title="Danh mục sản phẩm"
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item href="#">1</NavDropdown.Item>
                <BrowserRouter>
                  {" "}
                  <NavDropdown.Item href="#">2</NavDropdown.Item>
                </BrowserRouter>

                <NavDropdown.Divider />
                <NavDropdown.Item href="#">3</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Container
              className="justify-content-center"
              style={{ width: 400 }}
            >
              {/* <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form> */}
            {/* CURRENT USER */}
                <Nav.Link href="/profile" style={{marginLeft:"260px"}}>{user?.email}</Nav.Link>
            </Container>
            <Nav>
            </Nav>
            <div style={{ position: "relative", display: "inline-block" }}>
              <button
                onClick={toggleMenu}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <i className="fas fa-ellipsis-v"></i>
              </button>
              {open && (
                <ul
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "0",
                    backgroundColor: "#f1f1f1",
                    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
                    zIndex: 1,
                    listStyleType: "none",
                    padding: "10px 0",
                    margin: 0,
                    width: "150px"
                  }}
                >
                  <li style={{ padding: '8px 16px', cursor: 'pointer' }}>
                    <Nav.Link href="/login">Đăng nhập</Nav.Link>{" "}
                  </li>
                  <li style={{ padding: '8px 16px', cursor: 'pointer' }}>
                    <Nav.Link href="/signup">Đăng ký</Nav.Link>{" "}
                  </li>
                </ul>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/product" element={<Product />} />
            <Route exact path="/manager" element={<Manager />} />
            <Route exact path="/read" element={<UpdateRead />} />
            <Route exact path="/add" element={<Add />} />
            <Route exact path="/profile" element={<ProfilePage />} />
            <Route exact path="/product2" element={<PaginationComponent />} />
            <Route exact path="/accounts" element={<ReadAccount />} />
            <Route exact path="/orders" element={<ReadOrders />} />
            <Route exact path="/statistic" element={<ReadStatistic/>} />
            <Route exact path="/ticket" element={<AddTicket />} />
            <Route exact path="/readticket" element={<ReadTickets />} />
            <Route exact path="/createaccount" element={<CreateAccount />} />
            <Route path="/updatewrite/:firebaseId" element={ <UpdateWrite /> } />
          </Routes>
        </Router>
      </section>
    </div>
  );
}

export default NavBar;
