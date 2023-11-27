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
    <div className="flex justify-between items-center mt-2 ">
      <p className="text-right mb-1 mr-1">
        Page {currPage} of {numPages}
      </p>

      <div className="border border-gray-300 flex gap-1">
        <PrimaryButton onClick={goToPreviousPage} disabled={currPage === 1}>
          Previous
        </PrimaryButton>
        <PrimaryButton onClick={goToNextPage} disabled={currPage === numPages}>
          Next
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Pagination;
