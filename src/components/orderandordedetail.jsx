// src/App.js
import { useState } from 'react';

// import ItemList from './test';
import ItemDetails from './readOrderDetail';
import ReadOrders from './readOrders';
const App = () => {
  const [selectedItemId, setSelectedItemId] = useState(null);

  return (
    <div>
      <ReadOrders onSelect={setSelectedItemId} />
      <ItemDetails orderID={selectedItemId} />
    </div>
  );
};

export default App;
