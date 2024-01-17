import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GridPage from './pages/GridPage';
import CheckoutPage from './pages/CheckoutPage';
import InvoicePage from './pages/InvoicePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<GridPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/invoice" element={<InvoicePage />} />
      </Routes>
    </Router>
  );
};

export default App;
