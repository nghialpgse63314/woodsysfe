import { Card, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "../components/product.css";
export default function Product() {
  return (
    <Container
      fluid
      style={{
        backgroundColor: "white",
        width: "1050",
        height: "100vh",
      }}
    >
      <h1 className="text-center">Product</h1>
      <Row xs={1} md={2} className="g-4">
      {Array.from({ length: 8 }).map((_, idx) => (
        <Col key={idx}>
          <Card>
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
              <Card.Title>Title</Card.Title>
              <Card.Text>
                content
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>

    </Container>
  );
}

