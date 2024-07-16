import { get, getDatabase, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import app from "../config/firebase";

import { auth } from "../config/firebase";

function UpdateRead() {
  const navigate = useNavigate();

  let [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "Products");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const myData = snapshot.val();
        const temporaryArray = Object.keys(myData).map((myFireId) => {
          return {
            ...myData[myFireId],
            productId: myFireId,
          };
        });
        setDataArray(temporaryArray);
      } else {
        alert("error");
      }
    };
    fetchData();
  });

  //get current user
  const [user, setUser] = useState({});
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, [user]);

  const deleteFruit = async (productIdParam) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "Products/" + productIdParam);
    await remove(dbRef);
    window.location.reload();
  };

  return (
    <Container
      fluid
      style={{
        backgroundColor: "white",
        width: "1050",
        height: "100vh",
      }}
    >
      
      <h1>INVENTORY</h1>
      <h4> User Logged In: </h4>
      {user?.email}
      <Table bordered striped variant="dark">
        <thead>
          <tr>
        
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Width</th>
            <th>Length</th>
            <th>Thickness</th>
            <th>Description</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
          {dataArray.map((item, index) => {
            return (
              <tr key={index}>           
                <td>{index + 1}</td>
                <td>{item.image}</td>
                <td>{item.price}</td>
                <td>{item.productName}</td>
                <td>{item.width}</td>
                <td>{item.length}</td>
                <td>{item.thickness}</td>
                <td>{item.description}</td>
                <button 
                  className="button1"
                  onClick={() => navigate(`/updatewrite/${item.productId}`)}
                >
           
                  UPDATE
                </button>
                <button 
                  className="button1"
                  onClick={() => deleteFruit(item.productId)}
                >
                  {" "}
                  DELETE
                </button>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {/* {fruitArray.map((item, index) => (
            <>
              <li key={index}>
               {item.image} {item.name}: {item.price} : {item.productId}
             
                <button
                  className="button1"
                  onClick={ () => navigate(`/updateWrite/${item.productId}`)}
                >
                  UPDATE
                </button>
                <button
                  className="button1"
                  onClick={() => deleteFruit(item.productId)}
                >
                  DELETE
                </button>
              </li>
            </>
          ))} */}
      <button className="button1" onClick={() => navigate("/")}>
        GO HOMEPAGE
      </button>{" "}
      <br />
      {/* <button className="button1" onClick={() => navigate("/read")}>
          GO READ PAGE
        </button> */}
      <button className="button1" onClick={() => navigate("/add")}>
        ADD DATA
      </button>
    </Container>
  );
}

export default UpdateRead;
