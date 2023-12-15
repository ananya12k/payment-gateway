import React from "react";
import Layout from "../components/common/Layout";
import GridItem from "../components/GridItem";
import { Row, Col } from "react-bootstrap";

const GridPage = () => {
  const items = [
    { itemName: "BLUE", description: "Blue Sky", price: 19.99, image: "../assets/blue.jpg", backgroundColor: "red" },
    { itemName: "GREEN", description: "Green grass", price: 24.99, image: "image2.jpg", backgroundColor: "blue" },
    { itemName: "RED", description: "Red apple", price: 14.99, image: "image3.jpg", backgroundColor: "red" },
    { itemName: "YELLOW", description: "Yellow banana", price: 29.99, image: "image4.jpg", backgroundColor: "yellow" },
    { itemName: "PURPLE", description: "Purple grapes", price: 19.99, image: "image5.jpg", backgroundColor: "purple" },
    { itemName: "ORANGE", description: "Orange carrot", price: 24.99, image: "image6.jpg", backgroundColor: "orange" },
    { itemName: "PINK", description: "Pink flower", price: 14.99, image: "image7.jpg", backgroundColor: "pink" },
    { itemName: "BROWN", description: "Brown tree", price: 29.99, image: "image8.jpg", backgroundColor: "brown" },
    { itemName: "BLACK", description: "Black cat", price: 19.99, image: "image9.jpg", backgroundColor: "black" },
  ];

  const handleAddToCart = (item) => {
    // Implement cart logic or navigate to CheckoutPage
    console.log(`${item.itemName} added to cart`);
  };

  return (
    <Layout>
      <h2>Grid Page</h2>
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
