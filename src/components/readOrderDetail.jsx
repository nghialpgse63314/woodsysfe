// src/components/ItemDetails.js
import { get, getDatabase, ref } from "firebase/database";
import {
  MDBCard,
  MDBCardBody,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import app from "../config/firebase";
// eslint-disable-next-line react/prop-types
const ItemDetails = ({ orderID }) => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      if (!orderID) return;
      const db = getDatabase(app);
      const dbRef = ref(db, `Orders/${orderID}`);
      try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          setItem(snapshot.val());
        }
      } catch (error) {
        console.error("Error fetching item details: ", error);
      }
    };

    fetchItemDetails();
  }, [orderID]);

  // const handleCheckboxChange = (orderID) => (event) => {
  //   const updatedItems = { ...item, [orderID]: event.target.checked };
  //   setItem(updatedItems);
  //   const db = getDatabase(app);
  //   const dbRef = ref(db, `Orders/${orderID}`);
  //   set(dbRef, event.target.checked);
  // };

  if (!item) return <p>Select an item to see the details.</p>;

  return (
    <MDBContainer>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody className="px-4">
          <MDBRow>
            <MDBCol className=" align-items-center">
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Chi tiết đơn hàng
              </p>
              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Mã sản phẩm"
                    size="lg"
                    id="form1"
                    type="text"
                    value={item.ProductID}
                  />
                </MDBCol>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Mã khách hàng"
                    size="lg"
                    id="form1"
                    type="text"
                    value={item.customerID}
                  />
                </MDBCol>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Mã thanh toán"
                    size="lg"
                    id="form1"
                    type="text"
                    value={item.paymentID}
                  />
                </MDBCol>

                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Số lượng"
                    size="lg"
                    id="form1"
                    type="number"
                    value={item.quantity}
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Giá"
                    size="lg"
                    id="form6"
                    type="number"
                    value={item.price}
                  />
                </MDBCol>

                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Trọng lượng (kg)"
                    size="lg"
                    id="form6"
                    type="number"
                    value={item.TotalWeight}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Phí"
                    size="lg"
                    id="form1"
                    type="number"
                    value={item.fee}
                  ></MDBInput>
                </MDBCol>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Ngày giao hàng"
                    size="lg"
                    id="form1"
                    type="text"
                    value={item.ShippingDate}
                  ></MDBInput>
                </MDBCol>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Địa chỉ giao hàng"
                    size="lg"
                    id="form1"
                    type="tẽt"
                    value={item.ShipTo}
                  ></MDBInput>
                </MDBCol>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Trạng thái"
                    size="lg"
                    id="form1"
                    type="text"
                    value={item.status}
                  ></MDBInput>
                </MDBCol>
                <MDBCol md="6">
                  {/* {Object.keys(item).map((orderID) => ( */}
                    <div key={orderID}>       
                      <MDBCheckbox
                        wrapperClass="mb-4"
                        label="Hàng cồng kềnh"
                        labelStyle={{marginLeft:"20px",marginTop:"10px"}}
                        size="lg"
                        id="form1"
                        type="checkbox"
                    
                        style={{width:"40px",height:"40px"}}
                        checked={item.isBulky || false}
                      />
                    </div>
                  {/* ))} */}
                </MDBCol>
              
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
      {/* <div>
        {Object.keys(item).map((orderID) => (
          <div key={orderID}>
            <input type="checkbox" checked={item[orderID] || false} />
            <label>Item {orderID}</label>
          </div>
        ))}
      </div> */}
    </MDBContainer>
  );
};

export default ItemDetails;
