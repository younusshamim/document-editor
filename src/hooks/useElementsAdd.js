import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getLocalStorageItems,
  saveToLocalStorage,
} from "../utils/localStorage";

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
    const storedItems = getLocalStorageItems("elements");
    saveToLocalStorage("elements", [...storedItems, newElement]);
  };

  const changeCoordinates = (event) => {
    const { id } = event.active;
    const { x, y } = event.delta;

    const updatedElements = elements.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          position: {
            x: item.position.x + x,
            y: item.position.y + y,
          },
        };
      }
      return item;
    });

    setElements(updatedElements);
    saveToLocalStorage("elements", updatedElements);
  };

  const handleImageChange = async (e, pageNum) => {
    const uniqueId = uuidv4();
    const img = URL?.createObjectURL(e.target.files[0]);

    if (img) {
      handleAddElement({
        id: uniqueId,
        type: actionType,
        content: img,
        position: { ...coordinates },
        pageNum,
      });
    }

    clearStates();
  };

  useEffect(() => {
    const items = getLocalStorageItems("elements");
    setElements(items);
  }, []);

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
