import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
// import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { } from "react";
import { BrowserRouter, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Logo from "../assets/images/wologo.png";
import Add from "../components/adddata";
import UpdateRead from "../components/read";
import Home from "./home";
import Login from "./login";
import Manager from "./manager";
import Product from "./product";
import ProfilePage from "./profile";
import Signup from "./signup";
function NavBar() {
  
  return (
    <div >
      <Navbar expand="lg" className="bg-body-tertiary" >
        <Container fluid style={{backgroundColor:"white"}}>
          <Navbar.Brand href="#home" style={{ fontSize: "20px" }}>
            <img
              alt="logo"
              src={Logo}
              width= "100%"
              height={75}
              className="d-inline-block align-top"
            />{" "}
           
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" style={{ fontSize: "19px",fontWeight:"bold" }}>
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">Trang chủ</Nav.Link>
              {/* <CustomLink to="/">Pricing</CustomLink> */}           
              <Nav.Link href="/product">Sản phẩm</Nav.Link>
              <Nav.Link href="/manager">Tư vấn</Nav.Link>
              <Nav.Link href="/read">Manager</Nav.Link>
              <NavDropdown title="Danh mục sản phẩm" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/profile">profile</NavDropdown.Item>
                <BrowserRouter> <NavDropdown.Item href="#">asd</NavDropdown.Item></BrowserRouter>
               
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">combo</NavDropdown.Item>
              </NavDropdown>
            
            </Nav>
            <Container
              className="justify-content-center"
              style={{ width: 400 }}
            >
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              
            </Container>
            <Nav>
                <Nav.Link href="/login" >Đăng nhập</Nav.Link>          
                <Nav.Link href="/signup">Đăng ký</Nav.Link>
            </Nav>
      
           
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/product" element={<Product />} />     
            <Route exact path="/manager" element={<Manager />} />      
            <Route exact path="/read" element={<UpdateRead />} />        
            <Route exact path="/add" element={<Add />} />   
            <Route exact path="/profile" element={<ProfilePage />} />     
          </Routes>
        </Router>
      </section>
    </div>
  );
}

export default NavBar;
