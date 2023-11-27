import React, { useRef } from "react";
import { CiText } from "react-icons/ci";
import { LuImagePlus } from "react-icons/lu";
import PrimaryButton from "../../../components/PrimaryButton";

const Icon = ({ className, children, ...rest }) => {
  return (
    <PrimaryButton className={`${className}`} {...rest}>
      {children}
    </PrimaryButton>
  );
};

const ActionButtons = ({
  handleActionClick,
  actionType,
  handleImageChange,
}) => {
  const addImageRef = useRef();

  const toggleActionType = (type) => {
    if (actionType === type) {
      handleActionClick("");
    } else {
      handleActionClick(type);
    }
  };

  return (
    <div className="flex justify-center mb-4 gap-2">
      <Icon
        onClick={() => toggleActionType("text")}
        className={`${actionType === "text" ? "opacity-[0.7]" : "opacity-100"}`}
      >
        <CiText />
        <p>Text</p>
      </Icon>

      <input
        display="none"
        type="file"
        className="hidden"
        onChange={handleImageChange}
        ref={addImageRef}
        accept="image/*"
      />

      <Icon
        onClick={() => {
          !actionType && addImageRef.current.click();
          toggleActionType("image");
        }}
        className={`${
          actionType === "image" ? "opacity-[0.7]" : "opacity-100"
        }`}
      >
        <LuImagePlus />
        <p>Image</p>
      </Icon>
    </div>
  );
};

export default ActionButtons;
