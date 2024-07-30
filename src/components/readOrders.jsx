import 'bootstrap/dist/css/bootstrap.min.css';
import { get, getDatabase, ref } from "firebase/database";
import { MDBInput } from 'mdb-react-ui-kit';
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import app, { auth } from "../config/firebase";

// import DataComponent from "./filter";
//  import PaginationComponent from "../components/pagination";
// import { Pagination } from "react-bootstrap";
function ReadOrders({onSelect}) {
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState('');
    let [dataArray, setDataArray] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = filteredData.slice(firstIndex,lastIndex);
    const npage = Math.ceil(filteredData.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);

    // const navigate = useNavigate();
   const [totalItems, setTotalItems] = useState(0);
   //get data
  useEffect(() => {
    const fetchData = async () => {
      await fetchTotalItems();
      const db = getDatabase(app);
      const dbRef = ref(db, "Orders");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const myData = snapshot.val();
        const temporaryArray = Object.keys(myData).map((myFireId) => {
          return {
            ...myData[myFireId],
            orderID: myFireId,
         
          };
        });
        setDataArray(temporaryArray);
      } else {
        alert("error");
      }
    };
    fetchData();
  });
  //end of get data


  

  //Filter
  useEffect(() => {
    setFilteredData(dataArray.filter(item => item.orderID.toLowerCase().includes(filter.toLowerCase())));
  }, [filter, dataArray]);


  //get total count
  const fetchTotalItems = async () => {
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

 
  //get current user
  const [user, setUser] = useState({});
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, [user]);



  

  return (
    <Container
      fluid
      style={{
        backgroundColor: "white",
        height: "100%",
      }}
    >
      
      <h1 className="text-center">Đơn hàng</h1>
      {/* <h4> User Logged In:{user?.email} </h4> */}
      {/* <button className="button1" onClick={() => navigate("/add")}>
        ADD DATA
      </button> */}
      {/* <button className="button1" onClick={() => navigate("/")}>
        HOME
      </button>{" "} */}

      <div className='total-count'>
      Tổng đơn hàng: {totalItems}
      </div>
      <div>
      {/* /*Start of Filter */ }
      <MDBInput
        type="text"
        value={filter}
        style={{marginBottom:"10px",width:"500px"}}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Lọc mã đơn hàng"
      />
      {/* {filteredData.map(item => (
        <div key={item.id}>{item.productName}</div>
      ))} */}
        {/* /*End of Filter */ }
    </div>  
      <Table bordered striped variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>Mã đơn hàng</th>
            <th>Mã khách hàng</th>
            <th>Mã thanh toán</th>
            {/* <th>Weight</th> */}
            <th>Giá</th>
            {/* <th>Order date</th>
            <th>Shipping date</th> */}
            <th>Địa chỉ giao hàng</th>
            {/* <th>Fee</th> */}
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>       
            {records.map((item, index) => {
            return (
                <tr key={index} onClick={() => onSelect(item.orderID)}>             
                <td>{index + firstIndex + 1}</td>
                <td>{item.orderID}</td>
                <td>{item.customerID}</td>
                <td>{item.paymentID}</td>
                {/* <td>{item.TotalWeight}</td> */}
                <td>{item.price}</td>
                {/* <td>{item.OrderDate}</td>
                <td>{item.ShippingDate}</td> */}
                <td>{item.ShipTo} </td>     
                {/* <td>{item.fee}</td> */}
                <td>{item.status}
                </td>
                <td><a href="/ticket" className="page-link">Ticket</a></td> 
             
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

      {/* <Pagination key={loading}
          itemsPerPage={itemsPerPage}
        
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
        /> */}
  
      <br />
      {/* <button className="button1" onClick={() => navigate("/read")}>
          GO READ PAGE
        </button> */}
   
    </Container>
    
  );
}

export default ReadOrders;
