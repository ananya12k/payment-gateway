// pages/CheckoutPage.js
import React from 'react';
import Layout from '../components/common/Layout';
import CheckoutItem from '../components/CheckoutItem';

const CheckoutPage = () => {
  const cartItems = [
    { itemName: 'Item 1', quantity: 2, price: 20 },
    // Add more items as needed
  ];

  return (
    <Layout>
      <h2>Checkout Page</h2>
      <ListGroup>
        {cartItems.map((item, index) => (
          <CheckoutItem key={index} {...item} />
        ))}
      </ListGroup>
      {/* Add total and checkout button */}
    </Layout>
  );
};

export default CheckoutPage;
