import { Button } from "@mui/material";
import { useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { updateCustomer } from "../../../Redux/customerSlice";
import { setUploadClicked } from "../../../Redux/uploadSlice";

function UploadFiles({ customer }: any) {
  const [uploadFile, setUploadFile] = useState<File | undefined>();
  // console.warn("this runs again");
  const dispatch = useDispatch();
  const uploadedFileSingleUser = useSelector((state: RootState) => state.upload);
  const showup = useSelector((state: RootState) => state.customers);
  // console.log(customer);

  // auto logika tha prepei na paei sto upload oxi sto download apo to download apla tha pataei to koumpi
  // Check if the customer has uploadedFiles property
  if (customer.uploadedFiles === undefined) {
    // If it doesn't exist, initialize it as an empty array
    customer = { ...customer, uploadedFiles: [] };
  }

  const uploadFileHandler = (e: any) => {
    const userUploadedFile = e.target.files[0];
    console.log(userUploadedFile.type);
    dispatch(setUploadClicked());

    //* GUARDS
    if (userUploadedFile) {
      const fileType = userUploadedFile.type;
      if (fileType === "application/pdf" || fileType.startsWith("image/")) {
        setUploadFile(userUploadedFile);
        dispatch(updateCustomer(userUploadedFile));
        console.log(showup);
        console.log("File has been uploaded successfully");
      } else {
        alert("Invalid file type. Please select a PDF or image");
      }
    }
  };

  return (
    <Button variant="contained" size="small" component="label">
      <input
        type="file"
        accept=".pdf, image/*"
        style={{ display: "none" }}
        onChange={uploadFileHandler}
      />
      <UploadIcon />
    </Button>
  );
}

export default UploadFiles;
