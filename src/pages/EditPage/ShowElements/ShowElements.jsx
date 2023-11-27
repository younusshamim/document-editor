import React from "react";
import SingleElement from "./SingleElement";

const ShowElements = ({ elements, pageNum }) => {
  const filteredElements = elements.filter((el) => el.pageNum === pageNum);
  return filteredElements.map((el, i) => <SingleElement el={el} key={i} />);
};

export default ShowElements;
