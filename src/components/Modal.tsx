function Modal() {
  return (
    <>
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#my-modal1231"
            >
              Click to launch fullscren modal at all devices
            </button>

            <div
              className="modal fade"
              id="my-modal1231"
              aria-labelledby="my-modal-label"
              aria-hidden="true"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
            >
              <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="my-modal-label">
                      Modal Title
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">Some text to display in the modal.</div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                      Close
                    </button>
                    <button type="button" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
