import React from "react";
import Upload from "./Upload/Upload";
import PdfList from "./PdfList/PdfList";
import useFileUpload from "../../hooks/useFileUpload";

const UploadPage = () => {
  const {pdfList, onDrop, uploading, progress, handleRemoveItem} = useFileUpload();

  return (
    <div className='flex flex-col items-center min-h-screen bg-orange-50'>
      <h1 className='text-6xl font-bold mt-20 mb-10'>Edit PDF Documents Hassle Free</h1>
      <Upload onDrop={onDrop} uploading={uploading} progress={progress} />
      <PdfList pdfList={pdfList} handleRemoveItem={handleRemoveItem} />
    </div>
  );
};

export default UploadPage;
