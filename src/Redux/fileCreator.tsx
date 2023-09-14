export const fileCreator: any = (bytes: any) => {
  let fileArray: File[] = [];
  const binaryData = atob(bytes[1]);
  // Create an array to hold the binary data
  const byteArray = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    byteArray[i] = binaryData.charCodeAt(i);
  }

  // Create a Blob from the binary data
  let blob = new Blob([byteArray], {
    type: "application/" + bytes[2].split(".")[1],
  }); // Adjust the content type accordingly

  const file = new File([blob], bytes[2]);
  fileArray.push(file);
  return fileArray;
};
