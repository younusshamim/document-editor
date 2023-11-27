import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import convertToUint8Array from "../../utils/convertToUint8Array";
import ActionButtons from "./ActionButtons/ActionButtons";
import Pagination from "./Pagination/Pagination";
import useElementsAdd from "../../hooks/useElementsAdd";
import AddElement from "./AddElement/AddElement";
import ShowElements from "./ShowElements/ShowElements";
import { DndContext } from "@dnd-kit/core";
import PreviewModal from "./PreviewModal/PreviewModal";

const EditPage = () => {
  const {
    state: { file },
  } = useLocation();
  const [numPages, setNumPages] = useState(null);
  const [currPage, setCurrPage] = useState(1);
  const {
    actionType,
    coordinates,
    elements,
    handleActionClick,
    clearStates,
    handleDocumentBodyClick,
    handleAddElement,
    changeCoordinates,
    handleImageChange,
  } = useElementsAdd();

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const pdfUint8Array = convertToUint8Array(file.content);
  const base64String = btoa(String.fromCharCode.apply(null, pdfUint8Array));
  const pdfDataUrl = `data:application/pdf;base64,${base64String}`;

  return (
    <div className="flex flex-col items-center min-h-screen bg-blue-950 py-5">
      <PreviewModal pdfDataUrl={pdfDataUrl} elements={elements} />

      <ActionButtons
        handleActionClick={handleActionClick}
        actionType={actionType}
        handleImageChange={handleImageChange}
        currPage={currPage}
      />

      <Document
        file={pdfDataUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className={`max-w-[100%] overflow-auto relative ${
          actionType === "text" ? "cursor-text" : "cursor-default"
        }`}
        onClick={handleDocumentBodyClick}
      >
        {actionType === "text" && !!coordinates.x && (
          <AddElement
            coordinates={coordinates}
            clearStates={clearStates}
            handleAddElement={handleAddElement}
            actionType={actionType}
            currPage={currPage}
          />
        )}

        {elements.length > 0 && (
          <DndContext onDragEnd={changeCoordinates}>
            <ShowElements elements={elements} pageNum={currPage} />
          </DndContext>
        )}

        <div className="bg-gray-200 p-2 rounded-lg">
          <Page pageNumber={currPage} />
        </div>

        {numPages > 1 && (
          <Pagination
            numPages={numPages}
            currPage={currPage}
            setCurrPage={setCurrPage}
          />
        )}
      </Document>
    </div>
  );
};

export default EditPage;
