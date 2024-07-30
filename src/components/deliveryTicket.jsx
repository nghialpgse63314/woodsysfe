import "bootstrap-icons/font/bootstrap-icons.css";
import { child, get, getDatabase, push, ref, set } from "firebase/database";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../components/style.css";
import app from "../config/firebase";
function App() {
  const navigate = useNavigate();
//   const [validated, setValidated] = useState(false);
  const [shipperID, setShipperID] = useState("");
    // const [orderID, setOrderID] = useState("");
  const [status, setStatus] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [inventoryID,setInventoryID] = useState("");
  
  const [fieldValue, setFieldValue] = useState('');
//   const handleSubmit = (event) => {
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     setValidated(true);
//   };

  //   const saveData = async () => {
  //     const db = getDatabase(app);
  //     const newDocRef = push(ref(db, "Customers"));
  //     set(newDocRef, {
  //         name: name,
  //         phone: phone,
  //         address: address,
  //         email: email,
  //         password: password
  //     }).then( () => {
  //         alert("data save successfully")
  //     }).catch((error) => {
  //         alert("error", error.message)
  //     })
  //     window.location.reload(navigate("/"));
  // }


  useEffect(() => {
    const fetchData = () => {
        const orderID = "Orders/";
        const db = getDatabase(app);
        const dbRef = ref(db, "Orders");
        get(child(dbRef,`Orders/${orderID}`))
        .then(snapshot => {
          const data = snapshot.val();
          setFieldValue(data);
        })
        .catch(error => {
          console.error("Error fetching data: ", error);
        });
    };

    fetchData();
  }, );


  const register = async () => {
    try {
      const db = getDatabase(app);
      const newDocRef = push(ref(db, "Orders"));
      set(newDocRef, {
        
       
          inventoryID: inventoryID,
          shipperID: shipperID,
          status: status,
          dateCreated: dateCreated,
      }).then( () => {
          alert("data save successfully")
       
      }).catch((error) => {
          alert("error", error.message)
      })
      alert("Ticket created successfully!");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <MDBContainer style={{ width: 1500 }} >
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody className="px-4" >
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Create ticket
              </p>  
              
              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                   
                    wrapperClass="mb-4"
                    label="Shipper"
                    size="lg"
                    id="form1"
                    type="text"
                    value={shipperID}
                    onChange={(e) => setShipperID(e.target.value)}
                  />
                </MDBCol>
            
                <MDBCol md="6">
                  <MDBInput
                   
                    wrapperClass="mb-4"
                    label="OrderID"
                    size="lg"
                    id="form1"
                    type="text"
                    value={fieldValue}
                    //  onChange={(e) => setOrderID(e.target.value)}
                  />
                </MDBCol>
            

                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Status"
                    size="lg"
                    id="form2"
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                </MDBCol>

                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="InvetoryID"
                    size="lg"
                    id="form2"
                    type="number"
                    value={inventoryID}
                    onChange={(e) => setInventoryID(e.target.value)}
                  />
                </MDBCol>
              </MDBRow>
              <MDBInput
                wrapperClass="mb-4"
                label="Date created"
                size="lg"
                id="form6"
                type="text"
                style={{ width: 475 }}
                value={dateCreated}
                onChange={(e) => setDateCreated(e.target.value)}
              />

              <Button className="mb-4" size="lg" onClick={register}>
              Save         
              </Button>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default App;
