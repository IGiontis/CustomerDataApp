import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Customers from "../pages/Customers";
import AddCustomer from "../pages/AddCustomer";
import PageNotFound from "../pages/PageNotFound";
import PageNav from "../components/navbar/PageNav";

function AppRoutes() {
  return (
    <BrowserRouter>
      <PageNav></PageNav>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="customers/list" element={<Customers />} />
        <Route path="add-customer" element={<AddCustomer />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
