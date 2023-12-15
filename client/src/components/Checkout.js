import React from 'react';
import CheckoutItem from './CheckoutItem';

const Checkout = ({ cartItems }) => {
  return (
    <div>
      <h2>Checkout Page</h2>
      {cartItems.map((item) => (
        <CheckoutItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default Checkout;
