import React, { useState } from "react";
// styles
import "./style.css";
// libararies
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// components
import BtnBigWithIcon from "../../common/button/btnBigWithIcon";
import EmployeeCreate from "../employeeCreate";
import Modal from "../../common/form/modal";
import EmployeeEdit from "../employeeEdit";
// UI
import EmployeesTable from "../../UI/employeesTable/employeesTable";
// store
import { getEmployees, removeEmployee } from "../../../store/employees.store";
import Loader from "../../common/loader";

const EmployeesListPage = () => {
  const [selectedEmployeeIdByRow, setSelectedEmployeeIdByRow] = useState();
  const employees = useSelector(getEmployees());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectEmployeeIdByRow = (id) => {
    if (selectedEmployeeIdByRow !== id) {
      setSelectedEmployeeIdByRow(id);
    } else setSelectedEmployeeIdByRow("");
  };

  const handleSelectedRow = (e) => {
    const tr = e.target.closest("tr");

    const cells = document.querySelectorAll("tr");
    function clearSelectRow() {
      cells.forEach((cell) => {
        cell.classList.remove("active-tr");
      });
    }

    if (tr.classList.value !== "active-tr") {
      clearSelectRow();
      return tr.classList.add("active-tr");
    }
    if (tr.classList.value === "active-tr") {
      return tr.classList.remove("active-tr");
    }
  };

  const handleDeleteEmployee = () => {
    dispatch(removeEmployee(selectedEmployeeIdByRow));
    setSelectedEmployeeIdByRow("");
  };

  return (
    <div className="container-fluid p-3 border rounded mt-3">
      <Modal componentId="employeeCreate" component={<EmployeeCreate />} />
      <Modal
        componentId="employeeEdit"
        component={<EmployeeEdit employeeId={selectedEmployeeIdByRow} />}
      />

      <div className="pb-3">
        <h2>Список сотрудников</h2>
      </div>

      <div className="d-flex flex-row justify-content-center ">
        <BtnBigWithIcon
          classNameBtn="btn btn-success"
          classNameIcon="bi bi-plus-square"
          btnText="Добавить сотрудника"
          isModal="modal"
          modalTargetId="#employeeCreate"
        />
        <BtnBigWithIcon
          classNameBtn="btn btn-primary"
          classNameIcon="bi bi-pencil-square"
          btnText="Редактировать сотрудника"
          onClick={() => navigate(`/employee/${selectedEmployeeIdByRow}/edit`)}
          disabled={!selectedEmployeeIdByRow && true}
        />
        <BtnBigWithIcon
          classNameBtn="btn btn-danger"
          classNameIcon="bi bi-trash3"
          btnText="Удалить запись"
          onClick={handleDeleteEmployee}
          disabled={!selectedEmployeeIdByRow && true}
        />
        <BtnBigWithIcon
          classNameBtn="btn btn-info"
          classNameIcon="bi bi-mortarboard"
          btnText="Редактор образования"
          onClick={() => navigate("/educationEditor")}
        />
      </div>

      <div className="d-flex justify-content-center align-items-center employees-table__container border rounded mt-3 mb-3 p-3">
        {employees ? (
          <EmployeesTable
            employees={employees}
            onSelectedRow={handleSelectedRow}
            onSelectEmployeeById={handleSelectEmployeeIdByRow}
          />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default EmployeesListPage;
