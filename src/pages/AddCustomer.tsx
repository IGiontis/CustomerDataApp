import CustomContainerRowCol from "../components/CustomContainerComponent";

function AddCustomer() {
  return (
    <CustomContainerRowCol
      containerClasses="container"
      rowClasses="row justify-content-center mt-5"
      colClasses="col-lg-7 col-md-6"
    >
      <div className="card bg-secondary text-white align-items-center">
        <div className="card-body justify-content-center">
          {/*//? probably delete shadow-sm p-3 mb-5 rounded  */}
          <div className="d-flex gap-2 align-items-center shadow-sm  p-3 mb-5 rounded  ">
            <button className="btn btn-success">+</button>
            <h5 className="card-title">
              <strong>New customer</strong>
            </h5>
          </div>
          <form className="col-md-12 ">
            <div className="mb-3 mt-4">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input type="text" className="form-control" id="name" />
            </div>
            <div className="mb-3">
              <label htmlFor="surname" className="form-label">
                Surname
              </label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="text-end mt-4">
              <button type="submit" className="btn btn-primary ">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </CustomContainerRowCol>
  );
}

export default AddCustomer;
