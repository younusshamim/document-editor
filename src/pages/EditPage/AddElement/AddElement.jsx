import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddElement = ({
  coordinates,
  clearStates,
  handleAddElement,
  actionType,
}) => {
  const uniqueId = uuidv4();

  const handleInputClick = (e) => {
    e.stopPropagation();
  };

  const handleInputBlur = (e) => {
    handleAddElement({
      id: uniqueId,
      type: actionType,
      content: e.target.value,
      position: { ...coordinates },
    });
    clearStates();
  };

  return (
    <div
      style={{
        position: "absolute",
        top: `${coordinates.y}px`,
        left: `${coordinates.x}px`,
        zIndex: 10,
      }}
    >
      <textarea
        type="text"
        placeholder="Type here"
        className="input w-full max-w-xs bg-opacity-5 bg-transparent text-sm"
        onClick={handleInputClick}
        onBlur={handleInputBlur}
      />
    </div>
  );
};

export default AddElement;
