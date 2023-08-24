import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../Redux/modalSlice";

import AddCustomer from "../../pages/AddCustomer";

const CustomerModal = ({ children }: any) => {
  const dispatch = useDispatch();
  // const showModal = useSelector((state: RootState) => state.modal.showModal);

  const closeModal = () => {
    dispatch(toggleModal());
  };

  return (
    <Modal show={true} onHide={closeModal} centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <AddCustomer />
      </Modal.Body>

      {/* <EditCustomer /> */}
    </Modal>
  );
};

export default CustomerModal;
