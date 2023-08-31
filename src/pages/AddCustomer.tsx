import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addCustomer } from "../Redux/customerSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toggleFetchError } from "../Redux/errorSlice";
import { closeModal } from "../Redux/modalSlice";
import Container from "@mui/material/Container";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";

//! IMPORTANT NOTE:
//* Here i pass the error handler from my reducer but i don't use it. Because when i don't have the server up will say from the beginning that error has been thrown

//! IMPORTANT NOTE:

//-----------------------------------------------------------------
//-----------------------------------------------------------------
function AddCustomer({ showTitle = true }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [address, setAddress] = useState([
    {
      city: "",
      street: "",
      customer: {},
    },
  ]);

  const nameInputRef = useRef<HTMLInputElement | null>(null);

  //* focus
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);
  //* End focus

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  const submitNewCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    // let customerData: any;
    let customerData = {
      id: Date.now().toString(),
      name: name,
      surname: surname,
      address: address,
    };

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
        // savedCustomer is the customer that it comes back from the backend
        const savedCustomer = await response.json();
        console.log(savedCustomer);
        console.log("works here");

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
        // dispatch(toggleModal());
        dispatch(closeModal());
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
    <Container maxWidth="xs">
      <Paper
        elevation={12}
        sx={{
          padding: 3,
          borderRadius: 8,
          marginTop: location.pathname === "/add-customer" ? 7 : 0,
        }}
      >
        <Box
          display="flex"
          gap={2}
          justifyContent="center"
          alignItems="center"
          boxShadow={4}
          p={3}
          mb={5}
          borderRadius={3}
        >
          <Typography variant="h5" component="h2">
            <strong>New customer</strong>
          </Typography>
        </Box>

        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="text"
                label="Name"
                value={name}
                onChange={handleNameChange}
                inputRef={nameInputRef}
                error={name === ""}
                helperText={name === "" ? "Name is required" : ""}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                label="Surname"
                value={surname}
                onChange={handleSurnameChange}
                error={surname === ""}
                helperText={surname === "" ? "Surname is required" : ""}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="text"
                label="Address"
                value={address[0].street}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleAddressChange(0, "street", event.target.value)
                }
                error={address[0].street === ""}
                helperText={address[0].street === "" ? "Address is required" : ""}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="flex-end" alignItems="flex-end">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={submitNewCustomer}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default AddCustomer;
