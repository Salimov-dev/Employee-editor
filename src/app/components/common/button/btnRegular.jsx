import React from "react";

const BtnRegular = ({
  text,
  className,
  type = "button",
  disabled,
  icon,
  onClick,
  isModal,
  modalTargetId,
  toggleModal
}) => {
  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      data-bs-dismiss={isModal}
      data-bs-toggle={toggleModal}
      data-bs-target={modalTargetId}
    >
      {icon && <i className={`${icon} + pe-1`}></i>}
      {text}
    </button>
  );
};

export default BtnRegular;
