import React from "react";
import Layout from "../components/common/Layout";
import GridItem from "../components/GridItem";
import { Row, Col } from "react-bootstrap";

const GridPage = () => {
  const items = [
    { itemName: "BLUE", description: "Blue Sky", price: 19.99, backgroundColor: "red" },
    { itemName: "GREEN", description: "Green grass", price: 24.99, backgroundColor: "blue" },
    { itemName: "RED", description: "Red apple", price: 14.99, backgroundColor: "red" },
    { itemName: "YELLOW", description: "Yellow banana", price: 29.99, backgroundColor: "yellow" },
    { itemName: "PURPLE", description: "Purple grapes", price: 19.99, backgroundColor: "purple" },
    { itemName: "ORANGE", description: "Orange carrot", price: 24.99,backgroundColor: "orange" },
    { itemName: "PINK", description: "Pink flower", price: 14.99,backgroundColor: "pink" },
    { itemName: "BROWN", description: "Brown tree", price: 29.99,  backgroundColor: "brown" },
    { itemName: "BLACK", description: "Black cat", price: 19.99,  backgroundColor: "black" },
  ];

  const handleAddToCart = (item) => {
    // Implement cart logic or navigate to CheckoutPage
    console.log(`${item.itemName} added to cart`);
  };

  return (
    <Layout>
      <h2 >Shop Items</h2>
      <Row>
        {items.map((item) => (
          <Col key={item.itemName} className="col-sm-12 col-md-4 col-lg-4">
            <GridItem
              itemName={item.itemName}
              description={item.description}
              image={item.image}
              onAddToCart={() => handleAddToCart(item)}
            />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default GridPage;
