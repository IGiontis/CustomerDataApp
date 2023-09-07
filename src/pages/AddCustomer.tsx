import React, { useState, ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { ADD_CUSTOMER } from "../Redux/Redux-Saga/ActionTypes/ActionTypes";
import UploadIcon from "@mui/icons-material/Upload";
import { RootState } from "../Redux/store";
import { setUpload } from "../Redux/uploadSlice";

//! IMPORTANT NOTE:
//* Here i pass the error handler from my reducer but i don't use it. Because when i don't have the server up will say from the beginning that error has been thrown

//! IMPORTANT NOTE:

//-----------------------------------------------------------------
//-----------------------------------------------------------------
function AddCustomer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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

  const submitNewCustomer = async (e: React.FormEvent) => {
    e.preventDefault();

    let customerData = {
      id: Date.now().toString(),
      name: fullName.name,
      surname: fullName.surname,
      address: address,
      // !
      uploadedFiles: uploadFile,
      // !
    };

    if (fullName.name === "" || fullName.surname === "" || address[0].street === "") return;

    dispatch({ type: ADD_CUSTOMER, payload: customerData });
    navigate("/customers/list");

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

  // !test it works but i ll need to put it inside the submit

  const [uploadFile, setUploadFile] = useState<File>();
  const testHandler = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      console.log(uploadFile?.name);
      console.log(selectedFile.name);
      // Check if the file type is valid (PDF or image)
      if (fileType === "application/pdf" || fileType.startsWith("image/")) {
        setUploadFile(selectedFile);
        console.log("FILE EXIST");
        console.log(selectedFile);
        //* here i add it in my upload store
        dispatch(setUpload(selectedFile));
      } else {
        // Display an error message or handle the invalid file type
        alert("Invalid file type. Please select a PDF or image.");
      }
    }
  };

  // !test

  // !delete me but it works
  const downloadStoredPDF = () => {
    // * https://www.youtube.com/watch?v=IPEqb_AJbAQ&ab_channel=CodeWithAamir this is how he did it
    if (uploadFile) {
      console.log(URL);
      console.log(URL.createObjectURL);
      const url = URL.createObjectURL(uploadFile);
      console.log(url);
      const a = document.createElement("a");
      a.href = url;
      a.download = uploadFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };
  // !delete me

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

              {/* //! test  */}
              <div className="d-flex  mt-4 p-3 border border-1 border-primary ">
                <Button variant="contained" size="small" component="label">
                  <input
                    type="file"
                    // this shows up only the pdf and the images, when the user press it
                    accept=".pdf, image/*"
                    style={{ display: "none" }}
                    onChange={testHandler}
                  />
                  <UploadIcon />
                </Button>

                <div className="ms-4">
                  {uploadFile ? <strong>{uploadFile?.name}</strong> : <p>upload something</p>}
                </div>
              </div>
              {/*//! end test */}
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
        {/* //!DELETE FOR SURE IS JUST TEST BUT IT FUCKING WORKS */}
        <div className="d-flex  mt-4 p-3 border border-1 border-primary ">
          <Button variant="contained" size="small" component="label">
            <input
              type="file"
              // this shows up only the pdf and the images, when the user press it
              accept=".pdf, image/*"
              style={{ display: "none" }}
              onChange={testHandler}
            />
            <UploadIcon />
          </Button>

          <div className="ms-4">
            {uploadFile ? (
              <>
                <strong>{uploadFile.name}</strong>
                <button onClick={downloadStoredPDF}>Download PDF</button>
              </>
            ) : (
              <p>Upload something</p>
            )}
          </div>
        </div>
        {/* //!DELETE FOR SURE IS JUST TEST */}
      </Paper>
    </Container>
  );
}

export default AddCustomer;
