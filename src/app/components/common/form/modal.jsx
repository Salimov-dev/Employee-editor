import React from "react";

const Modal = ({ component, componentId }) => {
  return (
    <div
      className="modal fade"
      id={componentId}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content p-2">
          <div className="modal-body">{component}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
