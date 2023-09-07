import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import EditCustomer from "../../pages/EditCustomer";
import { closeModal } from "../../Redux/modalSlice";
import AddCustomer from "../../pages/AddCustomer";
import { useNavigate } from "react-router-dom";
import { Modal, Box } from "@mui/material";

const CustomerModal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state: RootState) => state.modal.showModal);
  // const selectedCustomer = useSelector((state: RootState) => state.edit);
  const modalContent = useSelector((state: RootState) => state.modal.modalContent);
  const navigate = useNavigate();

  const closeModalHandler = () => {
    dispatch(closeModal());
    navigate(-1);
  };

  return (
    <Modal open={showModal} onClose={closeModalHandler}>
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: "400px",
          // boxShadow: 24,
          // p: 4,
          // borderRadius: 4,
        }}
      >
        {modalContent === "edit" && <EditCustomer />}
        {modalContent === "add" && <AddCustomer />}
      </Box>
    </Modal>
  );
};

export default CustomerModal;
