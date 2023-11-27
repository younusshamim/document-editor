//@ts-check
import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import ShowElements from "../ShowElements/ShowElements";
import { FaPlus, FaMinus } from "react-icons/fa6";

const PreviewModal = ({ pdfDataUrl, elements }) => {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const handleZoom = (type) => {
    switch (type) {
      case "zoomIn":
        setScale((prevScale) => prevScale * 1.2);
        break;

      case "zoomOut":
        setScale((prevScale) => Math.max(0.2, prevScale * 0.8));
        break;

      default:
        break;
    }
  };

  return (
    <dialog id="previewModal" className="modal modal-lg">
      <div className="modal-box min-w-full min-h-full rounded-none bg-gray-500 m-0 p-0 relative">
        <div className="bg-gray-800 h-12 mb-5 text-white flex justify-center items-center gap-3 fixed top-0 left-0 w-full z-10">
          <div className="cursor-pointer" onClick={() => handleZoom("zoomOut")}>
            <FaMinus />
          </div>
          <p>{parseInt(scale * 100)}%</p>

          <div className="cursor-pointer" onClick={() => handleZoom("zoomIn")}>
            <FaPlus />
          </div>
        </div>

        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white z-20">
            ✕
          </button>
        </form>

        <Document
          file={pdfDataUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          className={`max-w-[100%] overflow-auto relative flex justify-center mt-16`}
        >
          <div className="w-fit shadow-xl">
            {[...Array(numPages).keys()].map((_, index) => {
              const pageNumber = index + 1;

              return (
                <div key={index} className="mb-2 relative overflow-hidden">
                  {elements.length > 0 && (
                    <ShowElements
                      elements={elements}
                      pageNum={pageNumber}
                      zoom={scale}
                    />
                  )}
                  <Page pageNumber={pageNumber} scale={scale} />
                </div>
              );
            })}
          </div>
        </Document>
      </div>
    </dialog>
  );
};

export default PreviewModal;
