import { useDispatch } from "react-redux";
import { deleteCustomer } from "../../Redux/customerSlice";
import { Button } from "@mui/material";

interface DeleteButtonProps {
  classes?: string;
  customerId: number;
  customerName: string;
}

function DeleteButton({ classes, customerId, customerName }: DeleteButtonProps) {
  const dispatch = useDispatch();

  const handleDeleteClick = async () => {
    //* Popup window to make sure he wants to delete
    const deleteConfirmation = window.confirm(
      `Are you sure you want to delete the customer ${customerName.toUpperCase()} `
    );

    if (deleteConfirmation) {
      try {
        const response = await fetch(
          `http://localhost:8080/Facade/cust/deleteCustomer/${customerId}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.ok) {
          dispatch(deleteCustomer(customerId));
        }
      } catch (err) {
        console.log(err);
      }
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
      Delete
    </Button>
  );
}

export default DeleteButton;
