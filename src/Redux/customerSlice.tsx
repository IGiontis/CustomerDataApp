import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import CustomerType from "../interfaces/customerTypes";
import { fileCreator } from "./fileCreator";

const initialState: CustomerType[] = [];

const customerSlice = createSlice({
  name: "customers",
  initialState: initialState,
  reducers: {
    setCustomers(state, action) {
      let arrayOfCustomers = [];
      for (let customerIndex in action.payload) {
        const customerDataString = action.payload[customerIndex][0];

        const fileContentBase64 = action.payload[customerIndex][1];

        const customerData = JSON.parse(customerDataString);
        if (fileContentBase64) {
          const fileName = action.payload[customerIndex][2];
          const fileArray = fileCreator([null, fileContentBase64, fileName]);

          customerData.content = fileArray[0]; // Assuming only one file
        }

        arrayOfCustomers.push(customerData);
      }
      return arrayOfCustomers;
    },

    addCustomerSuccess(state, action: PayloadAction<[string, string?, string?]>) {
      const [customerDataString, fileContentBase64, fileName] = action.payload;
      const customerData = JSON.parse(customerDataString);

      // Use fileCreator to create a File object if fileContentBase64 exists
      if (fileContentBase64) {
        const fileArray = fileCreator([null, fileContentBase64, fileName]);
        customerData.content = fileArray[0]; // Assuming only one file
      }

      state.push(customerData);
    },

    /*
      console.log(action.payload);
      (3) ['{"name":"e","surname":"e","address":[{"street":"e"…:[],"id":232},"reduxID":null,"id":161}],"id":232}', null, null]
      */

    updateCustomer(state, action) {
      const [customerDataString, fileContentBase64, fileName] = action.payload;
      const customerData = JSON.parse(customerDataString);

      if (fileContentBase64) {
        const fileArray = fileCreator([null, fileContentBase64, fileName]);
        customerData.content = fileArray[0]; // Assuming only one file
      }

      const updatedCustomers = state.map((customer) => {
        if (customer.id === customerData.id) {
          return { ...customer, ...customerData };
        }
        return customer;
      });

      return updatedCustomers;
    },

    setUploadFileToCustomer(state, action) {
      state.push(action.payload);
    },

    deleteCustomer(state, action) {
      const customerIdToDelete = action.payload;

      // i need to put customerType because the typescript reads all the elements, so if i had put just number then all id,name etc would take number variable
      // The work here is that its check all the array of the customer id and when it lands into the customer
      return state.filter((customer: CustomerType) => customer.id !== customerIdToDelete);
    },
  },
});

export const { setCustomers, addCustomerSuccess, deleteCustomer, updateCustomer } =
  customerSlice.actions;
// export const fetchCustomers = createAction("customer/fetchCustomers");
export default customerSlice.reducer;
