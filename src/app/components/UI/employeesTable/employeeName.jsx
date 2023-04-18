import React from "react";

const EmployeeName = ({ name, id, onSelectEmployeeById }) => {
  return (
    <div
      onClick={() => onSelectEmployeeById(id)}
    >{`${name?.lastName} ${name?.firstName} ${name?.surName}`}</div>
  );
};

export default EmployeeName;
