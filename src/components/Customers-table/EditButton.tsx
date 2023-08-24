import { useNavigate } from "react-router-dom";
import CustomerType from "../../interfaces/customerTypes";

interface EditButtonTypes {
  classes: string;
  customer: CustomerType;
}

function EditButton({ classes, customer }: EditButtonTypes) {
  // console.log(customer.id);

  const customerId = customer.id;
  const navigate = useNavigate();

  const handleCustomerId = async () => {
    navigate(`/edit-customer/${customerId}`, { state: customer });
  };

  return (
    <button className={classes} onClick={handleCustomerId}>
      Edit
    </button>
  );
}

export default EditButton;
