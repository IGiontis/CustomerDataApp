import { useSelector } from "react-redux";
import CustomerTable from "../components/Customers-table/CustomerTable";
import { Container } from "@mui/material";
import { RootState } from "../Redux/store";
import LinearProgress from "@mui/material/LinearProgress";

function Customers() {
  const isLoading = useSelector((state: RootState) => state.isLoading.isLoading);

  return (
    //? here if i want the container be the same as the navbar i can make it just container

    <Container fixed>{isLoading ? <LinearProgress /> : <CustomerTable />}</Container>
  );
}

export default Customers;
