import CustomContainerComponent from "../components/CustomContainerComponent";
import CustomerTable from "../components/Customers-table/CustomerTable";

function Customers() {
  return (
    // todo here i need to make an .map so it will create auto new cells and also put dynamic the id/names/surnames etc now they are hardcoded

    //? here if i want the container be the same as the navbar i can make it just container

    <CustomContainerComponent
      containerClasses="container"
      rowClasses="row justify-content-center"
      colClasses="col-md-12 col-sm-12"
    >
      <CustomerTable />
    </CustomContainerComponent>
  );
}

export default Customers;
