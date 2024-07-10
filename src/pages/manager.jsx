import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Sidebar from "../components/sidebar.jsx";
export default function Manager() {
  return (
    <Container
      fluid
      style={{
        backgroundColor: "red",
        width: "1050",
        height: "500vh",
      }}
    >
     <div>
     <Sidebar />
     </div>
     <Nav.Link href="/product">Product</Nav.Link>
     
 
    </Container>
    
  );
}
