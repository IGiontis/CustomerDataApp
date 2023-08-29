import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import EditCustomer from "../../pages/EditCustomer";
import { closeModal } from "../../Redux/modalSlice";
import AddCustomer from "../../pages/AddCustomer";
import { useNavigate } from "react-router-dom";

const CustomerModal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state: RootState) => state.modal.showModal);
  const selectedCustomer = useSelector((state: RootState) => state.edit);
  const modalContent = useSelector((state: RootState) => state.modal.modalContent);
  const navigate = useNavigate();

  const closeModalHandler = () => {
    // dispatch(toggleModal());
    dispatch(closeModal());
    navigate(-1);
  };

  return (
    <Modal show={showModal} onHide={closeModalHandler} centered>
      <Modal.Header closeButton></Modal.Header>
      {/* <Modal.Body> */}
      {modalContent === "edit" && <EditCustomer customer={selectedCustomer} />}
      {modalContent === "add" && <AddCustomer />}
      {/* </Modal.Body> */}
    </Modal>
  );
};

export default CustomerModal;
