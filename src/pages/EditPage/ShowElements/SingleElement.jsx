import { useDraggable } from "@dnd-kit/core";
import React from "react";

const SingleElement = ({ el, zoom = 1 }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: el.id,
  });
  const dndKitStyle = transform
    ? {
        transform: `translate3d(${transform.x * zoom}px, ${
          transform.y * zoom
        }px, 0)`,
      }
    : undefined;

  switch (el.type) {
    case "text":
      const elFontSize = `${14 * zoom}px`;

      return (
        <pre
          className="absolute z-10 cursor-move"
          style={{
            fontSize: elFontSize,
            top: `${el.position.y * zoom}px`,
            left: `${el.position.x * zoom}px`,
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
      const imgWidth = `${192 * zoom}px`;

      return (
        <img
          src={el.content}
          alt=""
          className="absolute z-10 cursor-move"
          style={{
            width: imgWidth,
            top: `${el.position.y * zoom}px`,
            left: `${el.position.x * zoom}px`,
            ...dndKitStyle,
          }}
          ref={setNodeRef}
          {...listeners}
          {...attributes}
        />
      );

    default:
      break;
  }
};

export default SingleElement;
