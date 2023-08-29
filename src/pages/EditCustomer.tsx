import React, { useState, useEffect } from "react";
import CustomContainerRowCol from "../components/custom/CustomContainerComponent";
import { useDispatch } from "react-redux";

import { selectCustomer } from "../Redux/editSlice";
import { closeModal } from "../Redux/modalSlice";
import { useNavigate } from "react-router-dom";
import { updateCustomer } from "../Redux/customerSlice";

// ----------------------------------------------------------------
function EditCustomer({ customer }: any) {
  const navigate = useNavigate();
  //! test
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectCustomer(customer));
  }, [dispatch, customer]);

  //! test

  console.log(customer);

  const [name, setName] = useState(customer.name);
  const [surname, setSurname] = useState(customer.surname);
  const [address, setAddress] = useState(customer.address || [{ street: "" }]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(event.target.value);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedAddress = [
      {
        ...address[0],
        street: event.target.value,
      },
    ];
    setAddress(updatedAddress);
  };

  const handleCancel = () => {
    dispatch(closeModal());
    navigate(-1);
  };

  const submitEditCustomer = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create the edited customer data object
    let editedCustomer = {
      ...customer,
      name: name,
      surname: surname,
      address: address,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/Facade/cust/update/${editedCustomer.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedCustomer),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Customer edited:", responseData);
        console.log(editedCustomer);
        // !!test
        dispatch(updateCustomer(responseData));
        // !!test

        // goes to the last /

        dispatch(closeModal());
        navigate(-1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CustomContainerRowCol
      containerClasses="container"
      rowClasses="row justify-content-center mt-5"
      colClasses="col-sm-8 col-md-7 col-lg-6"
    >
      <div className="card bg-secondary text-white align-items-center">
        <div className="card-body justify-content-center">
          <div className="d-flex gap-2 align-items-center shadow-sm p-3 mb-5 rounded">
            <h5 className="card-title">
              <strong>Edit customer</strong>
            </h5>
          </div>
          <form className="col-md-12">
            <div className="mb-3 mt-4">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="surname" className="form-label">
                Surname
              </label>
              <input
                type="text"
                className="form-control"
                id="surname"
                value={surname}
                onChange={handleSurnameChange}
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
                value={address[0].street}
                onChange={handleAddressChange}
              />
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button type="button" className="btn btn-danger btn-sm" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm" onClick={submitEditCustomer}>
                Save Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </CustomContainerRowCol>
  );
}

export default EditCustomer;
