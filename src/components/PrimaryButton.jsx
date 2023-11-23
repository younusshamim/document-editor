import React from "react";

const PrimaryButton = ({children, className}) => {
  return (
    <button className={`${className} btn bg-blue-950 hover:bg-blue-950 text-white h-12 text-lg px-6`}>
      {children}
    </button>
  );
};

export default PrimaryButton;
