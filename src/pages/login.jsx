import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  MDBCard,
  MDBCardBody,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBInputGroup,
  MDBRow,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { auth } from "../config/firebase";
// import { IconButton } from "@material-ui/core";
import { MDBIcon } from "mdbreact";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import "../components/login.css";
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const eye = <FaEye/>;
  const eyeOff = <FaEyeSlash/>;
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

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <h2 className="fw-bold mb-2 text-center">Đăng nhập</h2>
              <p> </p>

              <MDBInput
                wrapperClass="mb-4 w-100"
                label="Email"
                id="formControlEmail"
                type="email"
                size="lg"
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInputGroup>
                <MDBInput
                  wrapperClass="mb-4 w-100"
                  label="Mật khẩu"
                  size="lg"
                  id="formControlPassword"
                  type={passwordShown}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                >
                  <MDBIcon
                    className="eye-icon"
                    onClick={togglePasswordVisiblity}
                  >
                    {icon}
                  </MDBIcon>
                  
                </MDBInput>
              </MDBInputGroup>
              <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                className="mb-4"
                label="Ghi nhớ mật khẩu"
              />

              <Button onClick={signIn}>Login</Button>

              <hr className="my-4" />
              <GoogleButton
                style={{ width: "100%", marginTop: "-10px" }}
                onClick={() => {
                  console.log("Google button clicked");
                }}
              />
              <p className="mb-0 text-center" style={{ marginTop: "10px" }}>
                Chưa có tài khoản?{" "}
                <a href="#!" className="text-blue-50 fw-bold ">
                  Đăng ký
                </a>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
