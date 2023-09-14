import React, { useState, useEffect } from "react";
import { Button, Tooltip } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CustomerType from "../../../interfaces/customerTypes";
import ImageIcon from "@mui/icons-material/Image";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DragAndDropFile from "./DragAndDropFile";

function FileButtonIcon({ customer }: { customer: CustomerType }) {
  const [fileType, setFileType] = useState(""); // State to store file type

  useEffect(() => {
    if (customer.content) {
      const file = customer.content;
      const fileName = file.name;
      const fileExtension = (fileName.split(".").pop() ?? "").toLowerCase();

      if (fileExtension === "pdf") {
        setFileType("pdf");
      } else if (["jpg", "jpeg", "png", "gif"].includes(fileExtension)) {
        setFileType("image");
      } else {
        setFileType("");
      }
    }
  }, [customer.content]);

  function handleDownloadPdf() {
    if (customer && customer.content) {
      const file = customer.content;
      const fileName = file.name;
      console.log(customer.content);
      console.log(fileName);

      if (fileName) {
        // Extract the file extension
        let fileExtension = (fileName.split(".").pop() ?? "").toLowerCase();
        console.log(fileExtension);
      }

      const url = window.URL.createObjectURL(file);

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = file.name;

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  }

  return (
    <>
      <Tooltip title={customer?.content?.name} disableInteractive>
        <div className="d-flex">
          {customer.content ? (
            <span>
              <Button
                size="small"
                disabled={customer.content === undefined}
                onClick={handleDownloadPdf}
              >
                {fileType === "pdf" ? <PictureAsPdfIcon /> : <ImageIcon />}
              </Button>
            </span>
          ) : (
            <span>
              <Button disabled={true}>
                <UploadFileIcon />
              </Button>
            </span>
          )}
        </div>
      </Tooltip>
    </>
  );
}

export default FileButtonIcon;
