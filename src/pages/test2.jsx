import { get, ref as sRef } from "firebase/database";
import { useEffect, useState } from "react";
import database from "../config/firebase";

function App() {
  const [users, setUsers] = useState("");

  //fetch data
  useEffect(() => {
    const usersRef = sRef(database,"Product");
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const usersArray = Object.entries(snapshot.val()).map(
            ([id, data]) => ({
              id,
              ...data,
            })
          );
          setUsers(usersArray);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <main className="container mx-auto">
      <h1 className="text-4xl font-bold text-center my-10">Fetch data test</h1>
      <div className="grid grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-gray-100 p-4 rounded-lg">
               <h2 className="text-2xl text-gray-900">{user.image}</h2>
            <h2 className="text-2xl text-gray-900">{user.price}</h2>
            <p className="text-gray-500">{user.name}</p>
          </div>
        ))}


      </div>
    </main>
  );
}

export default App;
