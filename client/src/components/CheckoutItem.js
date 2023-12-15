import React from 'react';

const CheckoutItem = ({ item }) => {
  return (
    <div>
      <h3>{item.name}</h3>
      <p>${item.price}</p>
    </div>
  );
};

export default CheckoutItem;
