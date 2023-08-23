import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomContainerRowCol from "../components/custom/CustomContainerComponent";
import { addCustomer } from "../Redux/customerSlice";

import { useNavigate } from "react-router-dom";
import { toggleFetchError } from "../Redux/errorSlice";

//! delete
import CustomerType from "../interfaces/customerTypes";

//! IMPORTANT NOTE:
//* Here i pass the error handler from my reducer but i don't use it. Because when i don't have the server up will say from the beginning that error has been thrown

//! IMPORTANT NOTE:

//-----------------------------------------------------------------
//-----------------------------------------------------------------
function AddCustomer({ showTitle = true }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const erroHandler = useSelector((state: any) => state.fetchDataError.fetchErrorHandler);

  // ? here i take the customers so i can change them with the edit
  const customers: CustomerType[] = useSelector((state: any) => state.customers);
  const test = customers.map((testaki: any) => {
    console.log(testaki.id);
  });

  // ? here i take the customers so i can change them with the edit

  // ! testing mode
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState([
    {
      city: "",
      street: "",
      customer: {},
    },
  ]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
  };

  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSurname = event.target.value;
    setSurname(newSurname);
  };

  const handleAddressChange = (index: any, field: any, value: any) => {
    const newAddresses = [...address];
    newAddresses[index] = { ...newAddresses[index], [field]: value };
    setAddress(newAddresses);
  };

  // ! testing mode

  const submitNewCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    // let customerData: any;
    let customerData = {
      id: Date.now().toString(),
      name: name,
      surname: surname,
      address: address,
    };

    // finalStep();
    console.log(name, surname);
    // check the form if is valid
    dispatch(toggleFetchError(false));
    if (name === "" || surname === "" || address[0].street === "") return;
    // check the form if is valid

    try {
      console.warn(customerData);
      const response = await fetch("http://localhost:8080/Facade/cust/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerData),
      });

      if (response.ok) {
        console.log("IT WORKS");

        // savedCustomer is the customer that it comes back from the backend
        const savedCustomer = await response.json();
        console.log(savedCustomer);
        console.log("works here");

        dispatch(toggleFetchError(false));

        // its the object with the info
        console.warn(customerData);
        console.log(savedCustomer);

        dispatch(addCustomer(savedCustomer));
        setName("");
        setSurname("");
        setAddress([
          {
            city: "",
            street: "",
            customer: {},
          },
        ]);

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
    <CustomContainerRowCol
      containerClasses="container"
      rowClasses="row justify-content-center mt-5"
      colClasses={showTitle ? "col-sm-8 col-md-7 col-lg-6" : '"col-sm-8 col-md-10 col-lg-10 "'}
    >
      <div className="card bg-secondary text-white align-items-center">
        <div className="card-body justify-content-center">
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
                value={name}
                onChange={handleNameChange}
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
                value={surname}
                onChange={handleSurnameChange}
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
                value={address[0].street}
                onChange={(event) => handleAddressChange(0, "street", event.target.value)}
                required
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
