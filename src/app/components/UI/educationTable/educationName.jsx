import React from "react";

const EducationName = ({ name, id, onSelectEducationById }) => {
  return <div onClick={() => onSelectEducationById(id)}>{name}</div>;
};

export default EducationName;
