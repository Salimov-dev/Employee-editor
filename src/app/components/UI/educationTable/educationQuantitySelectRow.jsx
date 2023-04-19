import React from "react";

const EducationQuantitySelectRow = ({ selectedEducationIdByRow }) => {
  return (
    <div>Выбрано: {selectedEducationIdByRow ? "1 строка" : "0 строк"}</div>
  );
};

export default EducationQuantitySelectRow;
