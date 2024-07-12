
import "bootstrap-icons/font/bootstrap-icons.css";
import { getDatabase, push, ref, set } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import app from "../config/firebase";


import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBInputGroup,
  MDBRow
} from "mdb-react-ui-kit";
import { Button } from "react-bootstrap";
import wood from "../assets/images/3.png";
import "../components/style.css";
function App() {
   const navigate = useNavigate();
  const [inputValue1,setInputValue1] = useState("");
  const [inputValue2,setInputValue2] = useState("");
  const [inputValue3,setInputValue3] = useState("");
  const [inputValue4,setInputValue4] = useState("");

  const [password, setPassword] = useState("");
  const eyes = <MDBIcon icon={'eye'} />;
  const eyeOff = <MDBIcon icon={'eye-slash'} />;
  const [icon, setIcon] = useState(eyeOff);
  const [passwordShown, setPasswordShown] = useState("password");
  const togglePasswordVisiblity = () => {
    // setPasswordShown(passwordShown ? false : true);
    if (passwordShown === "password") {
      setIcon(eyes);
      setPasswordShown("text");
    } else {
      setIcon(eyeOff);
      setPasswordShown("password");
    }
  };

  const saveData = async () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "Customers"));
    set(newDocRef, {
        name: inputValue1,
        phone: inputValue2,
        address: inputValue3,
        email: inputValue4,
        password: password
    }).then( () => {
        alert("data save successfully")
    }).catch((error) => {
        alert("error", error.message)
    })
    window.location.reload(navigate("/"));
}

  return (
    <MDBContainer style={{width: 1500}}>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody className="px-4">
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Tạo tài khoản
              </p>
              <MDBRow>
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Họ và tên"
                    size="lg"
                    id="form1"
                    type="text"
                    value={inputValue1} onChange={(e) => setInputValue1(e.target.value)}
                  />
                </MDBCol>

                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Số điện thoại"
                    size="lg"
                    id="form2"
                    type="number"
                    value={inputValue2} onChange={(e) => setInputValue2(e.target.value)}
                  />
                </MDBCol>
              </MDBRow>
              <MDBInput
                wrapperClass="mb-4"
                label="Địa chỉ"
                size="lg"
                id="form6"
                type="text"
                style={{ width: 475 }}
                value={inputValue3} onChange={(e) => setInputValue3(e.target.value)}
              />
               <MDBInput
                wrapperClass="mb-4"
                label="Email"
                size="lg"
                id="form6"
                type="text"
                style={{ width: 475 }}
                value={inputValue4} onChange={(e) => setInputValue4(e.target.value)}
              />
              <MDBRow>
                <MDBCol md="6">
                  <MDBInputGroup>
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Mật khẩu"
                      size="lg"
                      id="form1"
                      type={passwordShown}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    >
                      <MDBIcon className="eye-icon" onClick={togglePasswordVisiblity}>
                        {icon}
                      </MDBIcon>
                    </MDBInput>
                  </MDBInputGroup>
                </MDBCol>

                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Xác nhận mật khẩu"
                    size="lg"
                    id="form2"
                    type="password"
                  ></MDBInput>
                </MDBCol>
              </MDBRow>

              {/* <MDBBtn className="mb-4" size="lg" onClick={saveData}>
                Đăng ký
              </MDBBtn> */}
                <Button className="mb-4" size="lg" onClick={saveData}>Đăng ký</Button>
              <p className="mb-0 text-center">
                Đã có tài khoản{" "}
                <a href="#!" className="text-blue-50 fw-bold ">
                  Đăng nhập
                </a>
              </p>
            </MDBCol>

            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage src={wood} fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default App;
