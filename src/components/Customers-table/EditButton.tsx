import CustomerType from "../../interfaces/customerTypes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCustomer } from "../../Redux/editSlice";
import { setModalContent, openModal } from "../../Redux/modalSlice";

interface EditButtonTypes {
  classes: string;
  customer: CustomerType;
}

function EditButton({ classes, customer }: EditButtonTypes) {
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
    <button className={classes} onClick={handleCustomerId}>
      Edit
    </button>
  );
}

export default EditButton;
