import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Document } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import convertToUint8Array from "../../utils/convertToUint8Array";
import ActionButtons from "./ActionButtons/ActionButtons";
import SinglePage from "./SinglePage/SinglePage";
import useElementsAdd from "../../hooks/useElementsAdd";
import AddElement from "./AddElement/AddElement";
import ShowElements from "./ShowElements/ShowElements";
import { DndContext } from "@dnd-kit/core";

const EditPage = () => {
  const {
    state: { file },
  } = useLocation();
  const [numPages, setNumPages] = useState(null);
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
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-5">
      <ActionButtons
        handleActionClick={handleActionClick}
        actionType={actionType}
        handleImageChange={handleImageChange}
      />

      <Document
        file={pdfDataUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className={`max-w-[100%] overflow-auto bg-gray-200 p-2 relative ${
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
          />
        )}

        {elements.length > 0 && (
          <DndContext onDragEnd={handleDragEnd}>
            <ShowElements elements={elements} />
          </DndContext>
        )}

        {[...Array(numPages).keys()].map((_, i) => (
          <SinglePage
            key={i}
            numPages={numPages}
            index={i}
            coordinates={coordinates}
          />
        ))}
      </Document>
    </div>
  );

  function handleDragEnd(event) {
    const { id } = event.active;
    const { delta } = event;
    const { clientX, clientY } = event.activatorEvent;
    changeCoordinates(id, clientX, clientY, delta);
  }
};

export default EditPage;
