import React from "react";
import { DropzoneArea } from "material-ui-dropzone";

function DragAndDropFile({ onUpdateUploadedFile }: any) {
  const handlerDragAndDropFile = (files: File[]) => {
    if (files.length > 0) {
      const userUploadedFile = files[0];
      onUpdateUploadedFile(userUploadedFile);
    }
  };

  return (
    <div>
      <DropzoneArea
        acceptedFiles={[".pdf", "image/*"]}
        //   maxFileSize={5000000}
        filesLimit={1}
        onChange={handlerDragAndDropFile}
        //   showPreviews={true}
        showAlerts={true}
        dropzoneText="Upload your file"
        //   showFileNamesInPreview={true}
      />
    </div>
  );
}

export default DragAndDropFile;
