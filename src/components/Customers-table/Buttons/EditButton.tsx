import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { openModal } from "../../../Redux/modalSlice";
import { selectCustomer } from "../../../Redux/editSlice";

import CustomerType from "../../../interfaces/customerTypes";

interface EditButtonTypes {
  classes?: string;
  customer: CustomerType;
}

function EditButton({ customer }: EditButtonTypes) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.error("works");
  //! Here the bug is that the button runs automatically when the form is loaded

  const handleCustomerId = () => {
    console.warn("test edit");
    console.log(customer);
    dispatch(selectCustomer(customer));
    navigate(`/customers/list?editCustomerName=${customer.name}&id=${customer.id}`);
    dispatch(openModal("edit"));
  };

  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      onClick={handleCustomerId}
      sx={{
        "@media (max-width:600px)": {
          fontSize: "10px",
          padding: "5px 8px",
        },
      }}
    >
      <EditNoteIcon />
    </Button>
  );
}

export default EditButton;
