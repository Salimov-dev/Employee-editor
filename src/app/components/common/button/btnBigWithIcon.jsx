import React from "react";

const BtnBigWithIcon = ({
  type = "button",
  classNameBtn,
  classNameIcon,
  btnText,
  onClick,
  disabled = false,
  isModal,
  toggleModal,
  modalTargetId
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`d-flex align-items-center flex-column + ${classNameBtn}`}
      style={{ width: "150px" }}
      disabled={disabled}
      data-bs-toggle={isModal || toggleModal}
      data-bs-target={modalTargetId}
    >
      <i className={`fs-1 ${classNameIcon}`}></i>
      <div className="fs-9 text-wrap" style={{ width: "6rem" }}>
        {btnText}
      </div>
    </button>
  );
};

export default BtnBigWithIcon;
