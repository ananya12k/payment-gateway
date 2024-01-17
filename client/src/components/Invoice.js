import React from 'react';
import InvoiceItem from './InvoiceItem';

const Invoice = ({ purchasedItems }) => {
  return (
    <div>
      <h2>Invoice Page</h2>
      {purchasedItems.map((item) => (
        <InvoiceItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default Invoice;
