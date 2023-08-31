import Customer from "./CustomerBody";
import { useDispatch, useSelector } from "react-redux";
import FetchDataFailed from "../Errors/FetchDataFailed";
import { RootState } from "../../Redux/store";
import { setModalContent, openModal } from "../../Redux/modalSlice";
import CustomerModal from "../custom/Modal";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Paper } from "@mui/material";

function CustomerTable() {
  const fetchErrorHandler = useSelector((state: any) => state.fetchDataError.fetchErrorHandler);
  const navigate = useNavigate();
  // ! TEST MODE
  const dispatch = useDispatch();
  const showModal = useSelector((state: RootState) => state.modal.showModal);

  // ! TEST MODE
  const handleAddNewButton = () => {
    dispatch(setModalContent("add"));
    dispatch(openModal("add"));
    navigate(`/customers/list?AddNewCustomer=`);
  };

  // -------------------------------------------------------
  // -------------------------------------------------------
  //* here i use ternary operator to show the data if isn't loading
  return fetchErrorHandler ? (
    <FetchDataFailed />
  ) : (
    <Grid container justifyContent="center" alignItems="center" style={{ height: "70vh" }}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper elevation={13} sx={{ p: 2, borderRadius: 4 }}>
          <Button
            variant="contained"
            size="small"
            color="success"
            sx={{ marginBottom: "10px" }}
            onClick={handleAddNewButton}
          >
            +New
          </Button>
          {showModal && <CustomerModal />}
          <div
            className="table-responsive-sm table-container overflow-auto"
            style={{ maxHeight: "500px" }}
          >
            <table className="table table-striped table-condensed table-bordered">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Surname</th>
                  <th scope="col" className="col-sm-6 col-md-4 col-lg-4">
                    Addresses
                  </th>
                  <th scope="col" className="col-sm-1 col-md-2 col-lg-1">
                    Actions
                  </th>
                </tr>
              </thead>
              <Customer />
            </table>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default CustomerTable;
