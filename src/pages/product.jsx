import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "../components/product.css";
import app from "../config/firebase";
export default function Product() {
  let [data, setDataa] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "Products");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        setDataa(Object.values(snapshot.val()));
      } else {
        alert("error");
      }
    };
    fetchData();
  }, []);

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
      {/* data.from({ length: 8 }).map((item,index) */}
      {data.map((item,index) => (
        <Col key={index}>
          <Card>
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>  {item.price}</Card.Text>
              <Card.Text>  {item.image}</Card.Text>             
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>

    </Container>
  );
}

