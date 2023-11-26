const convertToUint8Array = (fileContent) => {
  const base64String = fileContent.split(",")[1];
  const binaryString = atob(base64String);
  return Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
};

export default convertToUint8Array;
