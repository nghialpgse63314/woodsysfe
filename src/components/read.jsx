import { get, getDatabase, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import app, { auth } from "../config/firebase";
// import DataComponent from "./filter";

function UpdateRead() {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState('');
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
  //Filter
  useEffect(() => {
    setFilteredData(dataArray.filter(item => item.productName.toLowerCase().includes(filter.toLowerCase())));
  }, [filter, dataArray]);


  //get current user
  const [user, setUser] = useState({});
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, [user]);

  const deleteProduct = async (productIdParam) => {
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
      
      <h1 className="text-center">INVENTORY</h1>
      <h4> User Logged In:{user?.email} </h4>
      <button className="button1" onClick={() => navigate("/add")}>
        ADD DATA
      </button>
      <button className="button1" onClick={() => navigate("/")}>
        GO HOMEPAGE
      </button>{" "}
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
      <Table bordered striped variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Price</th>
            <th>Name</th>
            <th>Width</th>
            <th>Length</th>
            <th>Thickness</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => {
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
                <button  style={{width:"80px"}}
                  className="button1"
                  onClick={() => navigate(`/updatewrite/${item.productId}`)}
                >
           
                  UPDATE
                </button>
                <button style={{width:"80px"}}
                  className="button1"
                  onClick={() => deleteProduct(item.productId)}
                >
                  {" "}
                  DELETE
                </button>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <br />
      {/* <button className="button1" onClick={() => navigate("/read")}>
          GO READ PAGE
        </button> */}
   
    </Container>
  );
}

export default UpdateRead;
