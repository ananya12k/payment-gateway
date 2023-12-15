import React from 'react';

const InvoiceItem = ({ item }) => {
  return (
    <div>
      <h3>{item.name}</h3>
      <p>${item.price}</p>
    </div>
  );
};

export default InvoiceItem;
