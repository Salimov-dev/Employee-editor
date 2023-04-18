import React from "react";

const BtnOpenEditEducation = ({ isModal, modalTargetId }) => {

  return (
    <button
    type="button"
      className="btn pe-0 pt-0 fs-4"
      data-bs-toggle={isModal}
      data-bs-target={modalTargetId}
    >
      <i className="bi bi-pencil-square"></i>
    </button>
  );
};

export default BtnOpenEditEducation;
