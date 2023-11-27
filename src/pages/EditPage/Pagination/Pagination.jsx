import React from "react";
import PrimaryButton from "../../../components/PrimaryButton";

const Pagination = ({ numPages, currPage, setCurrPage }) => {
  const goToPreviousPage = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currPage < numPages) {
      setCurrPage(currPage + 1);
    }
  };

  return (
    <div className="flex justify-between items-center mt-3 ">
      <p className="text-right mb-1 mr-1 text-white">
        Page {currPage} of {numPages}
      </p>

      <div className="flex gap-2">
        <PrimaryButton onClick={goToPreviousPage}>Previous</PrimaryButton>
        <PrimaryButton onClick={goToNextPage}>Next</PrimaryButton>
      </div>
    </div>
  );
};

export default Pagination;
