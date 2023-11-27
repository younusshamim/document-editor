import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useElementsAdd = () => {
  const [actionType, setActionType] = useState("");
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [elements, setElements] = useState([]);

  // handler
  const handleActionClick = (type) => setActionType(type);

  const clearStates = () => {
    setActionType("");
    setCoordinates({ x: 0, y: 0 });
  };

  const handleDocumentBodyClick = (e) => {
    if (actionType === "text") {
      const element = e.target;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setCoordinates({ x, y });
    }
  };

  const handleAddElement = (newElement) => {
    setElements((prevElements) => [...prevElements, newElement]);
  };

  const changeCoordinates = (id, clientX, clientY, delta) => {
    if (id && clientX !== undefined && clientY !== undefined) {
      const updatedElements = elements.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            position: {
              x: clientX - delta.x,
              y: clientY - delta.y,
            },
          };
        }
        return item;
      });
      setElements(updatedElements);
    }
  };

  const handleImageChange = (e) => {
    const uniqueId = uuidv4();
    const file = e.target.files[0];
    const img = URL.createObjectURL(file);

    if (img) {
      handleAddElement({
        id: uniqueId,
        type: actionType,
        content: img,
        position: { ...coordinates },
      });
    }

    clearStates();
  };

  return {
    actionType,
    coordinates,
    elements,
    handleActionClick,
    clearStates,
    handleDocumentBodyClick,
    handleAddElement,
    changeCoordinates,
    handleImageChange,
  };
};

export default useElementsAdd;
