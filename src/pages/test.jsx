import { onValue, ref as sRef } from "firebase/database";
import { useEffect, useState } from "react";
import database from "../config/firebase";

import Container from "react-bootstrap/Container";
const FetchData = () => {
    const [todoData,setTodoData] = useState([]);
    
    useEffect(() => {
            const starCountRef = sRef(database,"/Product");
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                const newProduct = Object.keys(data).map(key => ({
                    id:key,
                    ...data[key]
                }));
                console.log(newProduct);
                setTodoData(newProduct);
            })

    }

)
    return (
        <Container>
            <h1>Test fetch</h1>
            {
                todoData.map((item,index) => {
                    return(
                        <div key={index}>
                            <p>{item.image}</p>
                            <p>{item.price}</p>
                            <p>{item.name}</p>
                        </div>
                    )
                })
            }
        </Container>
    );
}

export default FetchData;