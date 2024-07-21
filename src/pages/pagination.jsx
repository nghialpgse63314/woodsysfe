import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from "firebase/database";
import { useEffect, useState } from 'react';
import app from "../config/firebase";
const PAGE_SIZE = 10;

const PaginationComponent = () => {
  const [data, setData] = useState([]);
  const [lastKey, setLastKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (key) => {
    setLoading(true);
    const database = getDatabase(app);
       const dbRef = ref(database, "Products");
    const q = query(dbRef,orderByKey(),limitToFirst(PAGE_SIZE),startAt("3"));

    const snapshot = await get(q);
    const data = snapshot.val();

    
    if (data) {
      const dataArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      // Remove the first item if it is the continuation of the previous data
      if (key) {
        dataArray.shift();
      }

      setData((prevData) => [...prevData, ...dataArray]);
      setLastKey(dataArray[dataArray.length - 1]?.id || null);

      // If the number of items fetched is less than PAGE_SIZE, it means there are no more items
      setHasMore(dataArray.length === PAGE_SIZE);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const loadMore = () => {
    if (hasMore) {
      fetchData(lastKey);
    }
  };

  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.productName}{item.price}</li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {hasMore && !loading && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
};

export default PaginationComponent;
