export const convertBlobToFile = (blob, fileName) => {
  blob.lastModifiedDate = new Date();
  blob.name = fileName;
  return new File([blob], blob.name, { type: blob.type });
};
