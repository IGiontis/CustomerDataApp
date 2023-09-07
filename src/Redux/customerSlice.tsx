import { createSlice } from "@reduxjs/toolkit";
import CustomerType from "../interfaces/customerTypes";

const initialState: CustomerType[] = [];

const customerSlice = createSlice({
  name: "customers",
  initialState: initialState,
  reducers: {
    setCustomers(state, action) {
      return action.payload;
    },

    addCustomerSuccess(state, action) {
      console.log(action.payload);
      state.push(action.payload);
      console.log(initialState);
    },

    updateCustomer(state, action) {
      const editedCustomer = action.payload;
      const index = state.findIndex((customer) => customer.id === editedCustomer.id);
      console.log(index);
      // if (index !== -1) {
      state[index] = editedCustomer;
      // }
    },

    deleteCustomer(state, action) {
      console.log(action.payload);
      const customerIdToDelete = action.payload;

      // i need to put customerType because the typescript reads all the elements, so if i had put just number then all id,name etc would take number variable
      // The work here is that its check all the array of the customer id and when it lands into the customer
      return state.filter((customer: CustomerType) => customer.id !== customerIdToDelete);
    },
  },
});

export const {
  setCustomers,
  addCustomerSuccess,

  deleteCustomer,
  updateCustomer,
} = customerSlice.actions;
// export const fetchCustomers = createAction("customer/fetchCustomers");
export default customerSlice.reducer;
