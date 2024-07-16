import { get, getDatabase, ref, set } from "firebase/database";
import {
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
    MDBTextArea,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import app from "../config/firebase";
function UpdateWrite() {
  const navigate = useNavigate();
  const { firebaseId } = useParams();

  let [productName, setProductName] = useState("");
  let [price, setPrice] = useState("");
  let [quantity, setQuantity] = useState("");
  let [description, setDescription] = useState("");
  let [length, setLength] = useState("");
  let [thickness, setThickness] = useState("");
  let [width, setWidth] = useState("");
  let [image, setImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const dbRef = ref(db, "Products/" + firebaseId);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const targetObject = snapshot.val();
        setProductName(targetObject.productName);
        setPrice(targetObject.price);
        setQuantity(targetObject.quantity);
        setLength(targetObject.length);
        setWidth(targetObject.width);
        setThickness(targetObject.thickness);
        setDescription(targetObject.description);
        setImage(targetObject.image);
      } else {
        alert("error");
      }
    };
    fetchData();
  }, [firebaseId]);

  const overwriteData = async () => {
    const db = getDatabase(app);
    const newDocRef = ref(db, "Products/" + firebaseId);
    set(newDocRef, {
      productName: productName,
      price: price,
      length: length,
      width: width,
      quantity: quantity,
      description: description,
      thickness: thickness,
      image: image,
    })
      .then(() => {
        alert("data updated successfully");
      })
      .catch((error) => {
        alert("error: ", error.message);
      });
  };

  return (
    <MDBContainer>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody className="px-4">
          <MDBRow>
            <MDBCol className=" align-items-center">
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Cập nhập sản phẩm
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
                  <Button className="mb-4" size="lg" onClick={overwriteData}>
                    Cập nhập
                  </Button>
                  <Button
                    className="mb-4"
                    size="lg"
                    onClick={() => navigate("/read")}
                  >
                    Sản phẩm
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

export default UpdateWrite;
