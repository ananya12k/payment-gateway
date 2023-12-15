// components/CheckoutItem.js
import React from 'react';
import { ListGroup } from 'react-bootstrap';

const CheckoutItem = ({ itemName, quantity, price }) => {
  return (
    <ListGroup.Item>
      <span>{itemName}</span>
      <span>Quantity: {quantity}</span>
      <span>Price: ${price}</span>
    </ListGroup.Item>
  );
};

export default CheckoutItem;
