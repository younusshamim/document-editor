import React from "react";
import SingleElement from "./SingleElement";

const ShowElements = ({ elements }) => {
  return elements.map((el, i) => <SingleElement el={el} key={i} />);
};

export default ShowElements;
