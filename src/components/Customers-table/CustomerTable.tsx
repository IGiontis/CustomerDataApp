import { Link } from "react-router-dom";
import Customer from "./CustomerBody";
import { useDispatch, useSelector } from "react-redux";
import FetchDataFailed from "../Errors/FetchDataFailed";
import { RootState } from "../../Redux/store";
import { toggleModal } from "../../Redux/modalSlice";
import AddCustomer from "../../pages/AddCustomer";
import CustomerModal from "../custom/Modal";

function CustomerTable() {
  const fetchErrorHandler = useSelector((state: any) => state.fetchDataError.fetchErrorHandler);

  // ! TEST MODE
  const dispatch = useDispatch();
  const showModal = useSelector((state: RootState) => state.modal.showModal);

  // ! TEST MODE

  // -------------------------------------------------------
  // -------------------------------------------------------
  //* here i use ternary operator to show the data if isn't loading
  return fetchErrorHandler ? (
    <FetchDataFailed />
  ) : (
    <div className="table-responsive-sm">
      <button
        className="btn btn-success btn-sm mt-4 mb-2 ms-4 "
        onClick={() => dispatch(toggleModal())}
      >
        +New
      </button>
      {showModal && <CustomerModal />}

      {/* here probably it re-renders */}

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

        {/* //* Here i loop over the customers and i print them to the screen */}
        <Customer />
      </table>
    </div>
  );
}

export default CustomerTable;
