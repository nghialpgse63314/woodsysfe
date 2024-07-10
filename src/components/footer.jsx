import {
  Col,
  Container,
  Image,
  Nav,
  NavLink,
  Row,
  Stack,
} from "react-bootstrap";
import Logo from "../assets/images/woodsys.png";
export default function Footer() {
  return (
    <footer style={{backgroundColor:"#DCA47C"}}>
      <Container fluid >
        <Row className="text-white p-4">
          <Col className="mx-5">
            <Stack>
              <Image src={Logo} alt="company logo" rounded width={200} height={200}></Image>
            </Stack>
          </Col>
          <Col>
            <Nav className="flex-column fs-5">
              Links
              <NavLink href="#" className="text-white">
                Home
              </NavLink>
              <NavLink href="#" className="text-white">
                About us
              </NavLink>
              <NavLink href="#" className="text-white">
                Products
              </NavLink>
              <NavLink href="#" className="text-white">
                Feedback
              </NavLink>
            </Nav>
          </Col>
          <Col>
            <h4>Contact us</h4>
            <p>a@a.com</p>
            <p>Phone:123456789</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
