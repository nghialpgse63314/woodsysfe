import "bootstrap-icons/font/bootstrap-icons.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBInputGroup,
  MDBRow,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import wood from "../assets/images/3.png";
import "../components/style.css";
import app, { auth } from "../config/firebase";
function App() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const eye = <FaEye />;
  const eyeOff = <FaEyeSlash />;
  const [icon, setIcon] = useState(eyeOff);
  const [passwordShown, setPasswordShown] = useState("password");
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
    if (passwordShown === "password") {
      setIcon(eye);
      setPasswordShown("text");
    } else {
      setIcon(eyeOff);
      setPasswordShown("password");
    }
  };

  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

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

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const db = getDatabase(app);
      const newDocRef = push(ref(db, "Customers/"));
      set(newDocRef, {
          name: name,
          phone: phone,
          address: address,
          email: email,
          password: password
      }).then( () => {
          alert("data save successfully")
       
      }).catch((error) => {
          alert("error", error.message)
      })
      alert("Account created successfully!");
      navigate("/");
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <MDBContainer style={{ width: 1500 }} >
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody className="px-4" noValidate validated={validated} onSubmit={handleSubmit}>
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
                    hasValidation
                    wrapperClass="mb-4"
                    label="Họ và tên"
                    size="lg"
                    id="form1"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </MDBCol>
            
                <MDBCol md="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Số điện thoại"
                    size="lg"
                    id="form2"
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                size="lg"
                id="form6"
                type="text"
                style={{ width: 475 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBRow>
                <MDBCol md="11">
                  <MDBInputGroup>
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Mật khẩu"
                      size="lg"
                      id="form1"
                      style={{ width: 475 }}
                      type={passwordShown}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    >
                      <MDBIcon
                        className="eye-icon-signup"
                        onClick={togglePasswordVisiblity}
                      >
                        {icon}
                      </MDBIcon>
                    </MDBInput>
                  </MDBInputGroup>
                </MDBCol>
              </MDBRow>

              <Button className="mb-4" size="lg" onClick={register}>
               Đăng ký          
              </Button>
              <p className="mb-0 text-center">
                Đã có tài khoản{" "}
                <a href="/login" className="text-blue-50 fw-bold ">
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
