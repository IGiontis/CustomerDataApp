import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { RootState } from "../../../Redux/store";
import { updateCustomer } from "../../../Redux/customerSlice";

function PDFButton({ customer }: any) {
  const dispatch = useDispatch();
  const uploadedFileSingleUser = useSelector((state: RootState) => state.upload);
  console.log(customer);

  // auto logika tha prepei na paei sto upload oxi sto download apo to download apla tha pataei to koumpi
  // Check if the customer has uploadedFiles property
  if (customer.uploadedFiles === undefined) {
    // If it doesn't exist, initialize it as an empty array
    customer = { ...customer, uploadedFiles: [] };
  }

  console.log(customer);

  const uploadFileStore = useSelector((state: RootState) => state.upload.uploadedFiles);

  const handleDownloadPdf = () => {
    console.log("test");
    const uploadedFile = uploadFileStore[0];
    console.log(uploadedFile);
    if (uploadFileStore.length > 0) {
      const uploadedFile = uploadFileStore[0];
      console.log(uploadedFile.name);
      console.log(URL);
      console.log(URL.createObjectURL);
      const url = URL.createObjectURL(uploadedFile);
      console.log(url);
      const a = document.createElement("a");
      a.href = url;
      a.download = uploadedFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Button size="small" component="label" onClick={handleDownloadPdf}>
      <PictureAsPdfIcon />
    </Button>
  );
}

export default PDFButton;
