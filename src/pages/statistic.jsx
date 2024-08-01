import Container from "react-bootstrap/Container";
// import Sidebar from "../components/sidebar.jsx";
import { get, getDatabase, ref } from "firebase/database";
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBCol,

  MDBRow,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import app from "../config/firebase";
export default function ReadStatistic() {
  const [totalItems, setTotalItems] = useState(0);
  const [totalAccount, setTotalAccount] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  //get total order count
  const fetchTotalOrders = async () => {
    try {
      const db = getDatabase(app);
      const dbRef = ref(db, "Orders");
      const snapshot = await get(dbRef);
      const totalCount = snapshot?.size || 0;
      setTotalItems(totalCount);
    } catch (error) {
      console.log("fetchTotalItems error: ", error);
    }
  };

  const fetchTotalAccounts= async () => {
    try {
      const db = getDatabase(app);
      const dbRef = ref(db, "Customers");
      const snapshot = await get(dbRef);
      const totalCount = snapshot?.size || 0;
      setTotalAccount(totalCount);
    } catch (error) {
      console.log("fetchTotalItems error: ", error);
    }
  };

  const fetchTotalProduct= async () => {
    try {
      const db = getDatabase(app);
      const dbRef = ref(db, "Products");
      const snapshot = await get(dbRef);
      const totalCount = snapshot?.size || 0;
      setTotalProduct(totalCount);
    } catch (error) {
      console.log("fetchTotalItems error: ", error);
    }
  };




  useEffect(() =>{
    fetchTotalOrders();
    fetchTotalAccounts();
    fetchTotalProduct();
  })

  return (
    <Container
      fluid
      style={{
        backgroundColor: "white",
        height: "100%",
      }}
    >
          <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href="/">Trang chủ</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="/accounts">Tài khoản</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="/read">Kho hàng</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="/orders">Đơn hàng</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>Thống kê</MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
              <a href="/profile">Hồ sơ</a>
              </MDBBreadcrumbItem>            
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>
        <div>
        <h1>Statistic</h1>
      </div>
      <div className="total-count">Tổng đơn hàng: {totalItems}</div>
      <div className="total-count">Tổng tai khoan: {totalAccount}</div>
      <div className="total-count">Tổng san pham: {totalProduct}</div>
      
    </Container>
  );
}
