import { getDatabase, push, ref, set } from "firebase/database";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import app from "../config/firebase";

export default function Add() {
    const navigate = useNavigate();
    const [inputValue1,setInputValue1] = useState("");
    const [inputValue2,setInputValue2] = useState("");
    const [inputValue3,setInputValue3] = useState("");

    const saveData = async () => {
        const db = getDatabase(app);
        const newDocRef = push(ref(db, "Products"));
        set(newDocRef, {
            image: inputValue1,
            productName: inputValue2,
            price: inputValue3,
        }).then( () => {
            alert("data save successfully")
        }).catch((error) => {
            alert("error", error.message)
        })
       window.location.reload(navigate("/read"));
    }

    return(      
        <div>
             <h1>Add data</h1>              
            Image<input type="text" value={inputValue1} onChange={(e) => setInputValue1(e.target.value)} />
            Name<input type="text" value={inputValue2} onChange={(e) => setInputValue2(e.target.value)} />
            Price<input type="number" value={inputValue3} onChange={(e) => setInputValue3(e.target.value)} />

            <button onClick={saveData}>ADD DATA</button>
        </div>
    );
}