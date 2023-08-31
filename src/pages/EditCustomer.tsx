import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { selectCustomer } from "../Redux/editSlice";
import { closeModal } from "../Redux/modalSlice";
import { useNavigate } from "react-router-dom";
import { updateCustomer } from "../Redux/customerSlice";
import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

// ----------------------------------------------------------------
function EditCustomer({ customer }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState(customer.name);
  const [surname, setSurname] = useState(customer.surname);
  const [address, setAddress] = useState(customer.address || [{ street: "" }]);

  useEffect(() => {
    dispatch(selectCustomer(customer));
  }, [dispatch, customer]);

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
    if (name === "" || surname === "" || address[0].street === "") return;

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
