import React, { useState } from "react";
import Layout from "../components/common/Layout";
import GridItem from "../components/GridItem";
import { Row, Col, Button } from "react-bootstrap";

const GridPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const checkout = async () => {
    await fetch('http://localhost:3000/checkout', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({items: items.itemName})
    }).then((response) => {
        return response.json();
    }).then((response) => {
        if(response.url) {
            window.location.assign(response.url); // Forwarding user to Stripe
        }
    });
}

//blue - price_1OQ9VfSI7wOHRdQYcOpqQeM7
//green - price_1OQ9XeSI7wOHRdQYU6V0wtNT
//red - price_1OQ9Y9SI7wOHRdQYuGJ9lIRB
//yellow - price_1OQ9YmSI7wOHRdQY63XuZhTg
//purple - price_1OQ9c9SI7wOHRdQYQXHbUi6p
//orange - price_1OQ9d9SI7wOHRdQYsbgxvl2Z
//pink - price_1OQ9eISI7wOHRdQYkHsZOBTY
//brown - price_1OQ9uOSI7wOHRdQYXS1ZIrHY
//black - price_1OQ9v8SI7wOHRdQYSrQELIIy

  const items = [
    { id: "price_1OQ9VfSI7wOHRdQYcOpqQeM7" ,itemName: "BLUE", description: "Blue Sky", price: 19.99, backgroundColor: "red", image: "https://picsum.photos/250/250?random=1" },
    { id: "price_1OQ9XeSI7wOHRdQYU6V0wtNT" ,itemName: "GREEN", description: "Green grass", price: 24.99, backgroundColor: "blue", image: "https://picsum.photos/250/250?random=2" },
    { id: "price_1OQ9Y9SI7wOHRdQYuGJ9lIRB" ,itemName: "RED", description: "Red apple", price: 14.99, backgroundColor: "red", image: "https://picsum.photos/250/250?random=3" },
    { id: "price_1OQ9YmSI7wOHRdQY63XuZhTg" ,itemName: "YELLOW", description: "Yellow banana", price: 29.99, backgroundColor: "yellow", image: "https://picsum.photos/250/250?random=4" },
    { id: "price_1OQ9c9SI7wOHRdQYQXHbUi6p" ,itemName: "PURPLE", description: "Purple grapes", price: 19.99, backgroundColor: "purple", image: "https://picsum.photos/250/250?random=5" },
    { id: "price_1OQ9d9SI7wOHRdQYsbgxvl2Z" ,itemName: "ORANGE", description: "Orange carrot", price: 24.99, backgroundColor: "orange", image: "https://picsum.photos/250/250?random=6" },
    { id: "price_1OQ9eISI7wOHRdQYkHsZOBTY" ,itemName: "PINK", description: "Pink flower", price: 14.99, backgroundColor: "pink", image: "https://picsum.photos/250/250?random=7" },
    { id: "price_1OQ9uOSI7wOHRdQYXS1ZIrHY" ,itemName: "BROWN", description: "Brown tree", price: 29.99, backgroundColor: "brown", image: "https://picsum.photos/250/250?random=8" },
    { id: "price_1OQ9v8SI7wOHRdQYSrQELIIy" ,itemName: "BLACK", description: "Black cat", price: 19.99, backgroundColor: "black", image: "https://picsum.photos/250/250?random=9" },
  ];

  
    const handle = () => {
      // Generate the link dynamically with the specified price
      const stripeLink = `https://buy.stripe.com/test_3cscNF87R2T2eoUdQT`;
  
      // Redirect to the dynamically generated link
      window.location.href = stripeLink;
    };

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.itemName === item.itemName);

    if (existingItem) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((cartItem) =>
          cartItem.itemName === item.itemName
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, { ...item, quantity: 1 }]);
    }

    const newTotalPrice = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    setTotalPrice(newTotalPrice);

    console.log(`${item.itemName} added to cart`);
  };

  return (
    <Layout>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2>Shop Items</h2>
        <Button onClick={handle}>Total:  ₹{totalPrice.toFixed(2)}</Button>
      </div>

      <br />

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