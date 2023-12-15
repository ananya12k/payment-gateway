import React from 'react';

const GridItem = ({ item, onAddToCart }) => {
  return (
    <div>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>${item.price}</p>
      <button onClick={() => onAddToCart(item)}>Add to Cart</button>
    </div>
  );
};

export default GridItem;
