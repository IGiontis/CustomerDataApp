import { Link, useNavigate } from "react-router-dom";
import Customer from "./CustomerBody";

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

      <Link to="/customers/list/add-customer">
        <button className="btn btn-success btn-sm mt-4 mb-2 ms-4 ">+New</button>
      </Link>

      <table className="table table-striped table-condensed table-bordered ">
        {/* Header of the table */}
        <thead className="thead-light">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col" className="col-lg-4 col-md-4 col-sm-6">
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
