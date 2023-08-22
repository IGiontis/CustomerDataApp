import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Customers from "../pages/Customers";
import AddCustomer from "../pages/AddCustomer";
import PageNotFound from "../pages/PageNotFound";
import PageNav from "../components/navbar/PageNav";
import ModalCustomer from "../components/custom/ModalCustomer";

function AppRoutes() {
  return (
    <BrowserRouter>
      <PageNav></PageNav>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="customers/list" element={<Customers />}></Route>
        {/* <Route path="/customers/list/add-customer" element={<AddCustomer />} /> */}
        <Route path="/customers/list/add-customer" element={<ModalCustomer />} />
        <Route path="/add-customer" element={<AddCustomer />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
