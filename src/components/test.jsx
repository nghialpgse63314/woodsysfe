import { get, getDatabase, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import app from "../config/firebase";

const ItemList = ({onSelect}) => {
  const [items, setItems] = useState([]);
  // const [selectedItems, setSelectedItems] = useState([]);
  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "Orders");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const itemsArray = data
        ? Object.keys(data).map((key) => ({ orderID: key, ...data[key] }))
        : [];
      setItems(itemsArray);
      return () => dbRef.off();
    }
  };

  useEffect(() => {
    fetchData();
   
  }, []);

  // const handleRowClick = async (orderID) => {
  //   // Handle the click event here
  //   const db = getDatabase(app);
  //   const dbRef = ref(db, "Orders");
  //   const snapshot = await get(dbRef);
  //   console.log(`Row with orderID ${orderID} clicked`);
  //   // Example: Fetch details of the clicked item
  //   if (snapshot.exists()) {
  //     const data = snapshot.val();
    

  //     console.log("Item details; ", data);
  //   }
  // };

  return (
    <Container
      fluid
      style={{
        backgroundColor: "white",
        height: "100%",
      }}
    >
    
      <Table bordered striped variant="light">
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>OrderID</th>
            <th>Customer ID</th>
            <th>Payment ID</th>
            {/* <th>Weight</th> */}
            <th>Price</th>
            {/* <th>Order date</th>
            <th>Shipping date</th> */}
            <th>Shipping address</th>
            {/* <th>Fee</th> */}
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <tr
                key={item.orderID}
                onClick={() => onSelect(item.orderID)}
              >
                {/* <td>{index + 1}</td> */}
                <td>{item.orderID}</td>
                <td>{item.customerID}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    
    </Container>

    // <ul>
    //   {items.map((item) => (
    //     <li key={item.orderID} onClick={() => this.onItemClick(item.orderID)}>

    //      OrderID {item.orderID},
    //      CustomerID {item.customerID}
    //     </li>
    //   ))}
    // </ul>
  );
};

export default ItemList;
