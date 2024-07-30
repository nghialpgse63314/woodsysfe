// import { get, getDatabase, ref } from "firebase/database";
  import { signOut } from "firebase/auth";
import { child, get, getDatabase, ref } from "firebase/database";
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCol,
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import app, { auth } from "../config/firebase";
export default function ProfilePage() {
  const navigate = useNavigate();
  const displayName = document.getElementById("displayName");
  const displayAddress = document.getElementById("displayAddress");
  const displayEmail = document.getElementById("displayEmail");
  const displayPhone = document.getElementById("displayPhone");


  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      const db = getDatabase(app);
      const dbRef = ref(db, "Customers");
      const snap =  await get(child(dbRef, `Customers/${user.uid}`));
        console.log(snap.val());
      if (snap.exists) {
        user.providerData.forEach((user) => {
          displayName.innerHTML = user.displayName;
          displayEmail.innerHTML = user.email;
          displayAddress.innerHTML = user.address;
          displayPhone.innerHTML = user.phone;
        });
      }
    });
  });

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
    window.location.reload();
  };
  return (
    
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href="/">Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="#">User</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="/read">Inventory</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Họ và tên</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText
                      className="text-muted"
                      id="displayName"
                    ></MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText
                      className="text-muted"
                      id="displayEmail"
                    ></MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Số điện thoại</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText
                      className="text-muted"
                      id="displayPhone"
                    ></MDBCardText>
                  </MDBCol>
                </MDBRow>
                {/* <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Chức vụ</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Staff</MDBCardText>
                  </MDBCol>
                </MDBRow> */}
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Địa chỉ</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText
                      className="text-muted"
                      id="displayAddress"
                    ></MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            <Button className="mb-4" size="lg" style={{width:100,marginRight:"100px"}}>
              Edit
            </Button>
            <Button className="mb-4" size="lg" onClick={logout} style={{width:100,marginLeft:"100px"}}>
              Logout
            </Button>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
