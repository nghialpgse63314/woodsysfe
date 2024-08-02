import { getDatabase, push, ref, set } from "firebase/database";

import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import app from "../config/firebase";

export default function AddTicket() {
 const navigate = useNavigate();
  const [inventoryID, setInventoryID] = useState("");
    // const [status, setStatus] = useState("");
  const [shipper, setShipper] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const saveData = async () => {

    const db = getDatabase(app);
    const newDocRef = push(ref(db, "Ticket"));
    set(newDocRef, {
      inventoryID: inventoryID,
      shipper: shipper,
      status: 'Chờ thanh toán',
      createdDate: createdDate,
    })
      .then(() => {
        alert("data save successfully");
      
      })
      .catch((error) => {
        alert("error", error.message);
      });
     navigate('/readticket');
  };
 

  return (
    <MDBContainer>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody className="px-4">
          <MDBRow>
            <MDBCol className=" align-items-center">
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
              Phiếu giao hàng
              </p>
              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Mã kho"
                    size="lg"
                    id="form1"
                    type="text"
                    value={inventoryID}
                    onChange={(e) => setInventoryID(e.target.value)}
                  />
                </MDBCol>

                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Shipper"
                    size="lg"
                    id="form1"
                    type="text"
                    value={shipper}
                    onChange={(e) => setShipper(e.target.value)}
                  />
                </MDBCol>
                {/* <MDBCol md="6">
                  <MDBInput
                   
                    wrapperClass="mb-4"
                    label="Trạng thái"
                    size="lg"
                    id="form1"
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  
                  />
                
                </MDBCol> */}
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Ngày tạo"
                    size="lg"
                    id="form1"
                    type="date"
                    value={createdDate}
                    onChange={(e) => setCreatedDate(e.target.value)}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol className=" align-items-center">
                  <Button className="mb-4" size="lg" onClick={saveData}>
                    Lưu
                  </Button>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}
