import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomContainerRowCol from "../components/custom/CustomContainerComponent";
import { addCustomer } from "../Redux/customerSlice";

import { useNavigate } from "react-router-dom";
import { toggleFetchError } from "../Redux/errorSlice";

//! IMPORTANT NOTE:
//* Here i pass the error handler from my reducer but i don't use it. Because when i don't have the server up will say from the beginning that error has been thrown

//! IMPORTANT NOTE:

function AddCustomer({ showTitle = true }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const erroHandler = useSelector((state: any) => state.fetchDataError.fetchErrorHandler);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    surname: "",
    address: [],
  });

  // the type of the event is from here https://fettblog.eu/typescript-react/events/ i added react
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //* destruction and take each name and each value
    const { name, value } = event.target;

    //* the name takes the specific name of the inputs and adds the value like
    setNewCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const submitNewCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    // check the form if is valid
    dispatch(toggleFetchError(false));
    if (newCustomer.name === "" || newCustomer.surname === "") return;
    // check the form if is valid

    try {
      const response = await fetch("http://localhost:8080/Facade/cust/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      });

      if (response.ok) {
        const savedCustomer = await response.json();

        dispatch(toggleFetchError(false));

        // its the object with the info
        console.log(savedCustomer);
        dispatch(addCustomer(savedCustomer));
        setNewCustomer({ name: "", surname: "", address: [] });
        navigate("/customers/list");
      } else {
        console.error("Error saving customer data");
        dispatch(toggleFetchError(true));
      }
    } catch (error) {
      dispatch(toggleFetchError(true));
      console.error("An error occurred:", error);
    }
  };

  return (
    //? here  in colClasses i can change both modal and add-customer component. Maybe i can add something like if to check when its modal or its just the component.
    <CustomContainerRowCol
      containerClasses="container"
      rowClasses="row justify-content-center mt-5"
      colClasses={showTitle ? "col-sm-8 col-md-7 col-lg-6" : '"col-sm-8 col-md-10 col-lg-10 "'}
    >
      <div className="card bg-secondary text-white align-items-center">
        <div className="card-body justify-content-center">
          {/*//? probably delete shadow-sm p-3 mb-5 rounded  */}
          {/*//? here i make it the showTitle because in few places i don't want to show the title  */}
          {showTitle && (
            <div className="d-flex gap-2  justify-content-center align-items-center shadow-sm  p-3 mb-5 rounded  ">
              {/* <button className="btn btn-success">+</button> */}
              <h5 className="card-title">
                <strong>New customer</strong>
              </h5>
            </div>
          )}

          <form className="needs-validation" onSubmit={submitNewCustomer}>
            <div className="mb-3 mt-4">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={newCustomer.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="surname" className="form-label">
                Surname
              </label>
              <input
                type="text"
                className="form-control"
                name="surname"
                value={newCustomer.surname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={newCustomer.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="text-end mt-4">
              <button type="submit" className="btn btn-primary">
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
