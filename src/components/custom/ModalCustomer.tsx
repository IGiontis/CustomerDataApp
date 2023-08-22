import { useSelector } from "react-redux";
import AddCustomer from "../../pages/AddCustomer";
import { Modal } from "react-bootstrap";

function ModalCustomer() {
  const showModal = useSelector((state: any) => state.modal.showModal);

  return (
    <div className="modal show" style={{ display: "block", position: "initial" }}>
      <Modal.Dialog>
        <Modal.Header>
          <span>Add New Customer</span>
          <button className="btn btn-close  " style={{ width: "40px" }}></button>
        </Modal.Header>

        <Modal.Body></Modal.Body>
        <AddCustomer showTitle={false} />
      </Modal.Dialog>
    </div>
  );
}

export default ModalCustomer;
