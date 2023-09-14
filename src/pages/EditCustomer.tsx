import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../Redux/modalSlice";
import { useNavigate } from "react-router-dom";
import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { EDIT_CUSTOMERS } from "../Redux/Redux-Saga/ActionTypes/ActionTypes";
import { RootState } from "../Redux/store";
import CustomerType from "../interfaces/customerTypes";

// ----------------------------------------------------------------
function EditCustomer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customer = useSelector<RootState, CustomerType | null>((state) => state.edit);

  // * In Redux, the useSelector hook allows you to select a piece of the application state. The first generic argument <RootState> specifies the type of your entire Redux store state. The second generic argument <CustomerType | null> specifies the type of the specific piece of state you're selecting. In your case, you want to select the state.edit property, which may be of type CustomerType or null.

  const [name, setName] = useState(customer?.name);
  const [surname, setSurname] = useState(customer?.surname);
  const [address, setAddress] = useState(customer?.address || [{ street: "" }]);

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

  const submitEditCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (name === "" || surname === "" || address[0].street === "") return;

    // Create the edited customer data object
    let editedCustomer = {
      ...customer,
      name: name,
      surname: surname,
      address: address,
    };
    dispatch({ type: EDIT_CUSTOMERS, payload: editedCustomer });

    navigate("/customers/list");
  };

  return (
    <Container maxWidth="lg" sx={{ padding: 2 }}>
      <Paper
        elevation={12}
        sx={{
          padding: 3,
          borderRadius: 8,
        }}
      >
        <Box
          display="flex"
          gap={2}
          justifyContent="center"
          alignItems="center"
          boxShadow={12}
          p={2}
          mb={5}
          borderRadius={3}
        >
          <Typography variant="h5" component="h2">
            <strong>Edit customer</strong>
          </Typography>
        </Box>

        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Surname"
                variant="outlined"
                fullWidth
                value={surname}
                onChange={handleSurnameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                margin="normal"
                value={address[0].street}
                onChange={handleAddressChange}
              />
            </Grid>
            <Grid container item xs={12} justifyContent={"space-between"}>
              <Typography variant="body1">File:</Typography>
              <Typography variant="body1">{customer?.content?.name}</Typography>
            </Grid>

            <Grid container direction="row" marginTop={2}>
              <Grid item xs={6}>
                <Box display="flex" marginLeft={2}>
                  <Button variant="contained" color="error" size="small" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Box display="flex" justifyContent="end">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={submitEditCustomer}
                  >
                    Save Customer
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default EditCustomer;
