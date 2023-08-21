import { Link, useNavigate } from "react-router-dom";
import Customer from "./CustomerBody";
import ModalCustomer from "../custom/ModalCustomer";

function CustomerTable() {
  // const navigate = useNavigate();

  return (
    <div className="table-responsive-sm">
      {/* <button
        className="btn btn-success btn-sm mt-4 mb-2 ms-4 "
        onClick={() => navigate("add-customer")}
      >
        +New
      </button> */}

      {/*//! test mode here  */}
      {/* [onHide, closeButton] are react-bootstrap build in value */}

      {/* <Button className="btn btn-warning" onClick={handleShow}>
        test
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <strong>New Customer</strong>{" "}
        </Modal.Header>
        <Modal.Body className="grid-example">
          <AddCustomer showTitle={false} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal> */}
      <ModalCustomer />

      {/*//! test mode here  */}

      <Link to="/customers/list/add-customer">
        <button className="btn btn-success btn-sm mt-4 mb-2 ms-4 ">+New</button>
      </Link>

      <table className="table table-striped table-condensed table-bordered">
        {/* Header of the table */}
        <thead className="thead-light">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col" className="col-sm-6  col-md-4  col-lg-4">
              Addresses
            </th>
            <th scope="col" className=" col-sm-1 col-md-2 col-lg-1 ">
              Actions
            </th>
          </tr>
        </thead>

        {/* Body starts inside the customer*/}
        {/* //? Here i loop over the customers and i print them to the screen */}
        <Customer />
      </table>
    </div>
  );
}

export default CustomerTable;
