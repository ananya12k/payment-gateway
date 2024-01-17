import React from 'react';
import GridItem from './GridItem';

const Grid = ({ items, onAddToCart }) => {
  return (
    <div>
      <h2>Grid Page</h2>
      {items.map((item) => (
        <GridItem key={item._id} item={item} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default Grid;
