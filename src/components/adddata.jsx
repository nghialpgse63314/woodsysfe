import { getDatabase, push, ref, set } from "firebase/database";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBTextArea,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import app from "../config/firebase";
export default function Add() {
    const navigate = useNavigate();
   
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [length, setLength] = useState("");
  const [thickness, setThickness] = useState("");
  const [width, setWidth] = useState("");
  const [image, setImage] = useState("");
  const [weight, setWeight] = useState("");


    const saveData = async () => {
        const db = getDatabase(app);
        const newDocRef = push(ref(db, "Products"));
        set(newDocRef, {
            image: image,
            productName: productName,
            price: price,
            quantity : quantity,
            description : description,
            length : length,
            width : width,
            thickness : thickness,
            weight: weight
        }).then( () => {
            alert("data save successfully")
        }).catch((error) => {
            alert("error", error.message)
        })
       window.location.reload(navigate("/read"));
    }

    return(      
          <MDBContainer>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody className="px-4">
          <MDBRow>
            <MDBCol className=" align-items-center">
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
               Thêm sản phẩm
              </p>
              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Tên sản phẩm"
                    size="lg"
                    id="form1"
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </MDBCol>

                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Số lượng"
                    size="lg"
                    id="form1"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
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
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </MDBCol>

                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Chiều dài"
                    size="lg"
                    id="form6"
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Độ rộng"
                    size="lg"
                    id="form1"
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                  ></MDBInput>
                </MDBCol>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Độ dày"
                    size="lg"
                    id="form1"
                    type="number"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                  ></MDBInput>
                </MDBCol>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Cân nặng"
                    size="lg"
                    id="form1"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  ></MDBInput>
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="6">
                  <MDBTextArea
                    wrapperClass="mb-4"
                    label="Mô tả"
                    size="lg"
                    id="form1"
                    rows={4} cols={40}
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </MDBCol>

                <MDBCol md="6">
             
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Hình ảnh"
                    size="lg"
                    id="form1"
                    type="file"
                    // value={image}
                    style={{height:138}}
                    onChange={(e) => setImage(e.target.value)}
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