import React from "react";
import { Page } from "react-pdf";

const SinglePage = ({ numPages, index }) => {
  return (
    <div>
      <div className="border border-gray-300">
        <Page pageNumber={1 + index} size />
      </div>

      <p className="text-right mb-1 mr-1">
        Page {1 + index} of {numPages}
      </p>
    </div>
  );
};

export default SinglePage;
