import { get, getDatabase, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import app, { auth } from "../config/firebase";
// import DataComponent from "./filter";
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBCol,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
function UpdateRead() {
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage,setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState('');
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = filteredData.slice(firstIndex,lastIndex);
    const npage = Math.ceil(filteredData.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
  const navigate = useNavigate();
  
  let [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchTotalItems();
      const db = getDatabase(app);
      const dbRef = ref(db, "Products");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const myData = snapshot.val();
        const temporaryArray = Object.keys(myData).map((myFireId) => {
          return {
            ...myData[myFireId],
            productId: myFireId,
          };
        });
        setDataArray(temporaryArray);
      } else {
        alert("error");
      }
    };
    fetchData();
  });
  //Filter
  useEffect(() => {
    setFilteredData(dataArray.filter(item => item.productName.toLowerCase().includes(filter.toLowerCase())));
  }, [filter, dataArray]);

 //pagination
 function prePage(){
  if(currentPage !== 1){
    setCurrentPage(currentPage - 1)
  }
}

function changeCPage(id){
    setCurrentPage(id)
}

function nextPage(){
  if(currentPage !== lastIndex){
    setCurrentPage(currentPage + 1)
  }
}
//end of pagination

//get total count
const fetchTotalItems = async () => {
  try {
    const db = getDatabase(app);
    const dbRef = ref(db, "Products");
    const snapshot = await get(dbRef);
    const totalCount = snapshot?.size || 0;
    setTotalItems(totalCount);
  } catch (error) {
    console.log("fetchTotalItems error: ", error);
  }
};

  //get current user
  const [user, setUser] = useState({});
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, [user]);

  const deleteProduct = async (productIdParam) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "Products/" + productIdParam);
    await remove(dbRef);
    window.location.reload();
  };

  return (
    <Container
      fluid
      style={{
        backgroundColor: "white",
        width: "1050",
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
              <MDBBreadcrumbItem active>Kho hàng</MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="/orders">Đơn hàng</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="/readticket">Phiếu xuất kho</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="/profile">Hồ sơ</a>
              </MDBBreadcrumbItem>
            
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>
      <h1 className="text-center">Kho hàng</h1>
      {/* <h4> User Logged In:{user?.email} </h4> */}
      <Button  style={{marginBottom:"10px"}} className="button1" onClick={() => navigate("/add")}>
        Thêm sản phẩm
      </Button>
      {/* <button className="button1" onClick={() => navigate("/")}>
        GO HOMEPAGE
      </button>{" "} */}
      <div>
      {/* /*Start of Filter */ }
      <div className='total-count'>
      Tổng sản phẩm: {totalItems}
      </div>
      <MDBInput
        type="text"
        value={filter}
        style={{marginBottom:"10px",width:"500px"}}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Lọc theo tên"
      />
      {/* {filteredData.map(item => (
        <div key={item.id}>{item.productName}</div>
      ))} */}
        {/* /*End of Filter */ }
    </div>
      <Table bordered variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>Hình ảnh</th>
            <th style={{width:"100px"}}>Giá</th>
            <th style={{width:"100px"}}>Tên</th>
            <th style={{width:"100px"}}>Chiều rộng</th>
            <th style={{width:"100px"}}>Chiều dài</th>
            <th style={{width:"100px"}}>Độ dày</th>
            <th style={{width:"100px"}}>Cân nặng</th>
            <th style={{width:"100px"}}>Mô tả</th>     
            <th></th>   
          </tr>
        </thead>
        <tbody>
          {records.map((item, index) => {
            return (
              <tr key={index}>           
                <td>{index + 1}</td>
                <td>{item.image}</td>
                <td>{item.price}</td>
                <td>{item.productName}</td>
                <td>{item.width}</td>
                <td>{item.length}</td>
                <td>{item.thickness}</td>
                <td>{item.weight}</td>
                <td>{item.description}</td>
                <Button  style={{width:"100px"}}
                  className="button1"
                  onClick={() => navigate(`/updatewrite/${item.productId}`)}
                >          
                  Cập nhật
                </Button>
                <Button style={{width:"100px"}}
                  className="button1"
                  onClick={() => deleteProduct(item.productId)}
                >
                  Xóa
                </Button>
              </tr>
            );
          })}
        </tbody>
      </Table>
     
      <nav>
        <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>Prev</a>
            </li>
              {
                numbers.map((n,index) => (
                  <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={index}>
                    <a href="#" className="page-link" onClick={() => changeCPage(n)}>{n}</a>
                  </li>
                ))
              }
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>Next</a>
            </li>
        </ul>
      </nav>
      <br />
      {/* <button className="button1" onClick={() => navigate("/read")}>
          GO READ PAGE
        </button> */}
   
    </Container>
  );
}

export default UpdateRead;
