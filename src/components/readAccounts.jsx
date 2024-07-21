import { get, getDatabase, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import app, { auth } from "../config/firebase";
// import DataComponent from "./filter";

function ReadAccount() {
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState('');
  let [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "Customers");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const myData = snapshot.val();
        const temporaryArray = Object.keys(myData).map((myFireId) => {
          return {
            ...myData[myFireId],
            customerId: myFireId,
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
    setFilteredData(dataArray.filter(item => item.email.toLowerCase().includes(filter.toLowerCase())));
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

  const deleteAccount = async (customerIdParam) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "Customers/" + customerIdParam);
    await remove(dbRef);
    window.location.reload();
  };

  return (
    <Container
      fluid
      style={{
        backgroundColor: "white",
        height: "100%",
      }}
    >
      
      <h1 className="text-center">Accounts</h1>
      <h4> User Logged In:{user?.email} </h4>
      {/* <button className="button1" onClick={() => navigate("/add")}>
        ADD DATA
      </button> */}
      <button className="button1" onClick={() => navigate("/")}>
        GO HOMEPAGE
      </button>{" "}
      <div>
      {/* /*Start of Filter */ }
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter by email"
      />
      {/* {filteredData.map(item => (
        <div key={item.id}>{item.productName}</div>
      ))} */}
        {/* /*End of Filter */ }
    </div>
      <Table bordered striped variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>Address</th>
            <th>Email</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Password</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => {
            return (
              <tr key={index}>           
                <td>{index + 1}</td>
                <td>{item.address}</td>
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.password}</td>
                <button style={{width:"80px"}}
                  className="button1"
                  onClick={() => deleteAccount(item.customerId)}
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

export default ReadAccount;
