import React from "react";

const BtnClearEducation = ({onClearEducation, data}) => {
  return (
    <button
      onClick={onClearEducation}
      className="btn ps-0 pt-0 fs-4 border-0"
      disabled={!data?.education && true}
    >
      <i className="bi bi-x-square"></i>
    </button>
  );
};

export default BtnClearEducation;
