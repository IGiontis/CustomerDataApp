import CustomerType from "../../interfaces/customerTypes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCustomer } from "../../Redux/editSlice";
import { setModalContent, openModal } from "../../Redux/modalSlice";
import { Button } from "@mui/material";

interface EditButtonTypes {
  classes?: string;
  customer: CustomerType;
}

function EditButton({ customer }: EditButtonTypes) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCustomerId = async () => {
    console.log(customer);
    dispatch(selectCustomer(customer));
    dispatch(setModalContent("edit"));
    navigate(`/customers/list?editCustomerName=${customer.name}&id=${customer.id}`);
    // dispatch(toggleModal());
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
      Edit
    </Button>
  );
}

export default EditButton;
