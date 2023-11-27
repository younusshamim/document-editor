import { useDraggable } from "@dnd-kit/core";
import React from "react";

const SingleElement = ({ el }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: el.id,
  });

  const dndKitStyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  switch (el.type) {
    case "text":
      return (
        <pre
          className="absolute z-10 cursor-move"
          style={{
            top: `${el.position.y}px`,
            left: `${el.position.x}px`,
            ...dndKitStyle,
          }}
          ref={setNodeRef}
          {...listeners}
          {...attributes}
        >
          {el.content}
        </pre>
      );

    case "image":
      return (
        <img
          src={el.content}
          alt=""
          className="absolute z-10 cursor-move w-48"
          style={{
            top: `${el.position.y}px`,
            left: `${el.position.x}px`,
            ...dndKitStyle,
          }}
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          {...listeners}
          {...attributes}
        />
      );

    default:
      break;
  }
};

export default SingleElement;
