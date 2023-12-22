import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GridPage from './pages/GridPage';
import CheckoutPage from './pages/CheckoutPage';
import InvoicePage from './pages/InvoicePage';
import Success from './pages/Success';
import Cancel from './pages/Cancel';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<GridPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/invoice" element={<InvoicePage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel/>} />
      </Routes>
    </Router>
  );
};

export default App;
