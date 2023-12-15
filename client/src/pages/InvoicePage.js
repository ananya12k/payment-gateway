import React, { useState } from 'react';
import Invoice from '../components/Invoice';

const InvoicePage = () => {
  const [purchasedItems, setPurchasedItems] = useState([]);

  // Implement logic to fetch purchased items from your backend
  // For now, let's assume you have a function fetchPurchasedItems
  // const fetchedPurchasedItems = await fetchPurchasedItems();
  // setPurchasedItems(fetchedPurchasedItems);
  const samplePurchasedItems = [
    { _id: '1', name: 'Item 1', price: 10.99 },
    { _id: '2', name: 'Item 2', price: 19.99 },
    // Add more purchased items
  ];
  setPurchasedItems(samplePurchasedItems);

  return (
    <div>
      <h1>Welcome to the Invoice Page</h1>
      <Invoice purchasedItems={purchasedItems} />
    </div>
  );
};

export default InvoicePage;
