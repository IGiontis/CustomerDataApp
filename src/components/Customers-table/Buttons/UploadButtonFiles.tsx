import { Button } from "@mui/material";

import UploadIcon from "@mui/icons-material/Upload";
import { useDispatch } from "react-redux";
import { updateCustomer } from "../../../Redux/customerSlice";

import CustomerType from "../../../interfaces/customerTypes";
import { EDIT_CUSTOMERS } from "../../../Redux/Redux-Saga/ActionTypes/ActionTypes";

function UploadFiles({
  customer,
  uploadButtonMode,
  onUpdateUploadedFile,
}: {
  customer?: CustomerType | undefined | null;
  uploadButtonMode: string;
  onUpdateUploadedFile?: any;
}) {
  const dispatch = useDispatch();

  const uploadFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userUploadedFile = e.target.files?.[0];

    const testCustomer = {
      ...customer,
      content: userUploadedFile,
    };
    // dispatch(setUploadClicked());

    if (userUploadedFile) {
      const fileType = userUploadedFile.type;
      if (fileType === "application/pdf" || fileType.startsWith("image/")) {
        if (uploadButtonMode === "edit") {
          dispatch(updateCustomer([JSON.stringify(testCustomer), null, null]));
          dispatch({ type: EDIT_CUSTOMERS, payload: testCustomer });
          console.log(testCustomer);
          console.log(JSON.stringify(testCustomer));
          console.log("File has been updated successfully");
        }
        if (uploadButtonMode === "add") {
          onUpdateUploadedFile(userUploadedFile);
          console.log("new user updated successfully with file");
        }
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
