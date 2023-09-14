import React, { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { ADD_CUSTOMER } from "../Redux/Redux-Saga/ActionTypes/ActionTypes";
import DragAndDropFile from "../components/Customers-table/Buttons/DragAndDropFile";

//! IMPORTANT NOTE:
//* Here i pass the error handler from my reducer but i don't use it. Because when i don't have the server up will say from the beginning that error has been thrown

//! IMPORTANT NOTE:

//-----------------------------------------------------------------
//-----------------------------------------------------------------
function AddCustomer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const [fullName, setFullName] = useState({
    name: "",
    surname: "",
  });

  const [address, setAddress] = useState([
    {
      city: "",
      street: "",
      customer: {},
    },
  ]);

  const [uploadedFile, setUploadedFile] = useState<File | undefined>();

  const handleFullNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    // the name here refers to the name attribute in the input element so it checks if it is the name or the surname
    const { name, value } = e.target;
    setFullName({
      ...fullName,
      [name]: value,
    });
  };

  const handleAddressChange = (index: any, field: any, value: any) => {
    const newAddresses = [...address];
    newAddresses[index] = { ...newAddresses[index], [field]: value };
    setAddress(newAddresses);
  };

  const handleUploadedFile = (file: File) => {
    setUploadedFile(file);
  };

  const submitNewCustomer = async (e: React.FormEvent) => {
    e.preventDefault();

    let customerData = {
      id: Date.now().toString(),
      name: fullName.name,
      surname: fullName.surname,
      address: address,
      content: uploadedFile,
    };

    if (fullName.name === "" || fullName.surname === "" || address[0].street === "") return;

    dispatch({ type: ADD_CUSTOMER, payload: customerData });
    if (currentPath === "/add-customer") {
      navigate("/customers/list");
    }

    setFullName({
      name: "",
      surname: "",
    });
    setAddress([
      {
        city: "",
        street: "",
        customer: {},
      },
    ]);
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
                name="name"
                value={fullName.name}
                onChange={handleFullNameChange}
                autoFocus
                error={fullName.name === ""}
                helperText={fullName.name === "" ? "Name is required" : ""}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                label="Surname"
                name="surname"
                value={fullName.surname}
                onChange={handleFullNameChange}
                error={fullName.surname === ""}
                helperText={fullName.surname === "" ? "Surname is required" : ""}
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
              <div className="d-flex justify-content-between mt-4">
                {/* <UploadFiles uploadButtonMode={"add"} onUpdateUploadedFile={handleUploadedFile} /> */}
                <DragAndDropFile onUpdateUploadedFile={handleUploadedFile} />
              </div>
            </Grid>
            <p>
              File name: <strong>{uploadedFile?.name}</strong>
            </p>
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
