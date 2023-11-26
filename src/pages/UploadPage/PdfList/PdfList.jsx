import React from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import pdfIcon from "../../../assets/pdf-icon.png";
import PrimaryButton from "../../../components/PrimaryButton";

const PdfList = ({ pdfList, handleRemoveItem }) => {
  return (
    <div className="w-[1000px] flex justify-center flex-wrap gap-5">
      {pdfList.map((file, index) => (
        <div
          key={file.name + index}
          className="flex flex-col items-center gap-1 w-24 px-3 py-2 rounded-lg relative"
        >
          <div
            className="absolute top-0 right-0 cursor-pointer text-base"
            onClick={() => handleRemoveItem(file)}
          >
            <IoMdClose />
          </div>
          <img className="w-fit mb-1" src={pdfIcon} alt="PDF Icon" />
          <p className="text-sm text-center">{file.name}</p>
          <Link to="/edit" state={{ file }}>
            <PrimaryButton>Edit</PrimaryButton>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PdfList;
