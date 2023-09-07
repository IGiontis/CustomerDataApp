import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DELETE_CUSTOMERS } from "../../../Redux/Redux-Saga/ActionTypes/ActionTypes";

interface DeleteButtonProps {
  classes?: string;
  customerId: number;
  customerName: string;
}

function DeleteButton({ customerId, customerName }: DeleteButtonProps) {
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    //* Popup window to make sure he wants to delete
    const deleteConfirmation = window.confirm(
      `Are you sure you want to delete the customer ${customerName.toUpperCase()}  `
    );

    if (deleteConfirmation) {
      dispatch({ type: DELETE_CUSTOMERS, payload: customerId });
    }
  };

  return (
    <Button
      variant="contained"
      color="error"
      size="small"
      onClick={handleDeleteClick}
      sx={{
        "@media (max-width:600px)": {
          fontSize: "10px",
          padding: "5px 8px",
        },
      }}
    >
      <DeleteIcon />
    </Button>
  );
}

export default DeleteButton;
