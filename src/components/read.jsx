import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import app from "../config/firebase";

function Read() {
  // const navigate = useNavigate();

  let [fruitArray, setFruitArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "Products");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        setFruitArray(Object.values(snapshot.val()));
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
      <div>
        <h1 className="text-center">This is fetching</h1>
        <div>
          <Table className="container w-75" bordered striped variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {fruitArray.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.image}</td>
                    <td>{item.price}</td>
                    <td>{item.productName}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        {/* <button className="button1" onClick={() => navigate("/updateread")}>
            GO UPDATE READ
          </button>{" "}
          <br />
          <button className="button1" onClick={() => navigate("/")}>
            GO HOMEPAGE
          </button> */}
      </div>
    </Container>
  );
}

export default Read;
