import CustomerTable from "../components/Customers-table/CustomerTable";
import { Container } from "@mui/material";

function Customers() {
  return (
    // todo here i need to make an .map so it will create auto new cells and also put dynamic the id/names/surnames etc now they are hardcoded

    //? here if i want the container be the same as the navbar i can make it just container
    <Container fixed>
      <CustomerTable />
    </Container>
  );
}

export default Customers;
