import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Customers from "./pages/Customers";
import AddCustomer from "./pages/AddCustomer";

const MyComponent = () => {
  return (
    <BrowserRouter>
      <HomePage></HomePage>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="customers" element={<Customers />} />
        <Route path="add-customer" element={<AddCustomer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyComponent;
