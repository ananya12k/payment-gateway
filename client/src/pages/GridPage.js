import React, { useState, useEffect } from 'react';
import Grid from '../components/Grid';

const GridPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from the backend or use a sample data
    // Update the state with the fetched items
    // For now, let's assume you have a function fetchItems from your backend
    // const fetchedItems = await fetchItems();
    // setItems(fetchedItems);
    const sampleItems = [
      { _id: '1', name: 'Item 1', description: 'Description 1', price: 10.99 },
      { _id: '2', name: 'Item 2', description: 'Description 2', price: 19.99 },
      // Add more items
    ];
    setItems(sampleItems);
  }, []);

  const handleAddToCart = (item) => {
    // Implement logic to add item to the cart
    console.log('Added to cart:', item);
  };

  return (
    <div>
      <h1>Welcome to the Grid Page</h1>
      <Grid items={items} onAddToCart={handleAddToCart} />
    </div>
  );
};

export default GridPage;
