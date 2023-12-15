import React, { useState } from 'react';
import Checkout from '../components/Checkout';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);

  // Implement logic to fetch cart items from your backend
  // For now, let's assume you have a function fetchCartItems
  // const fetchedCartItems = await fetchCartItems();
  // setCartItems(fetchedCartItems);
  const sampleCartItems = [
    { _id: '1', name: 'Item 1', price: 10.99 },
    { _id: '2', name: 'Item 2', price: 19.99 },
    // Add more cart items
  ];
  setCartItems(sampleCartItems);

  return (
    <div>
      <h1>Welcome to the Checkout Page</h1>
      <Checkout cartItems={cartItems} />
    </div>
  );
};

export default CheckoutPage;

