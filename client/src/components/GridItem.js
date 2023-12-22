// components/GridItem.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const GridItem = ({ itemName, description, image, onAddToCart }) => {
  return (
    <Card>
      <Card.Img variant="top" src={image} alt={itemName} />
      <Card.Body>
        <Card.Title>{itemName}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button onClick={onAddToCart}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default GridItem;
