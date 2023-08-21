import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCustomer from "../../pages/AddCustomer";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function ModalCustomer() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    navigate("/customers/list");
  };

  const handleShow = () => {
    navigate("/customers/list/add-customer");
    setShow(true);
  };

  return (
    <div>
      <Button className="btn btn-warning" onClick={handleShow}>
        test
      </Button>

      {/* [onHide, closeButton] are react-bootstrap build in value */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <strong>New Customer</strong>{" "}
        </Modal.Header>
        <Modal.Body className="grid-example">
          <AddCustomer showTitle={false} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalCustomer;
