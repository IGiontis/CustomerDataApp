import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Customers from "../pages/Customers";
import AddCustomer from "../pages/AddCustomer";
import PageNotFound from "../pages/PageNotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <HomePage></HomePage>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="customers" element={<Customers />} />
        <Route path="add-customer" element={<AddCustomer />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
