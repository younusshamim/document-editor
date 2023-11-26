import React from "react";

const PrimaryButton = ({ children, className, ...rest }) => {
  return (
    <button
      className={`${className} btn btn-sm bg-blue-950 hover:bg-blue-950 text-white`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
