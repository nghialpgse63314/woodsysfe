import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "../components/product.css";
import app from "../config/firebase";
export default function Product() {
  const [dataArray, setDataArray] = useState([]);
  const [filter, setFilter] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "Products");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        setDataArray(Object.values(snapshot.val()));
      } else {
        alert("error");
      }
    };
    fetchData();
  }, []);

  //Filter
  useEffect(() => {
    setFilteredData(dataArray.filter(item => item.productName.toLowerCase().includes(filter.toLowerCase())));
  }, [filter, dataArray]);

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
      <div>
      {/* /*Start of Filter */ }
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter by name"
      />
      {/* {filteredData.map(item => (
        <div key={item.id}>{item.productName}</div>
      ))} */}
        {/* /*End of Filter */ }
    </div>
      <Row xs={1} md={2} className="g-4">
      {/* data.from({ length: 8 }).map((item,index) */}
      {filteredData.map((item,index) => (
        <Col key={index}>
          <Card>
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
              <Card.Title>{item.productName}</Card.Title>
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

