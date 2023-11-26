import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import convertToUint8Array from "../../utils/convertToUint8Array";

const EditPage = () => {
  const {
    state: { file },
  } = useLocation();
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const pdfUint8Array = convertToUint8Array(file.content);
  const base64String = btoa(String.fromCharCode.apply(null, pdfUint8Array));
  const pdfDataUrl = `data:application/pdf;base64,${base64String}`;

  return (
    <div className="flex flex-col items-center min-h-screen bg-orange-50 py-5">
      <div className="max-w-[100%] overflow-auto">
        <Document file={pdfDataUrl} onLoadSuccess={onDocumentLoadSuccess}>
          {[...Array(numPages).keys()].map((_, i) => (
            <>
              <div className="border border-gray-300">
                <Page pageNumber={1 + i} />
              </div>

              <p className="text-right mb-1 mr-1">
                Page {1 + i} of {numPages}
              </p>
            </>
          ))}
        </Document>
      </div>
    </div>
  );
};

export default EditPage;
