import React, { useEffect, useState } from "react";
// styles
import "./style.css";
// liabraries
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// components
import BtnBigWithIcon from "../../common/button/btnBigWithIcon";
import EducationTable from "../educationTable/educationTable";
import EducationCreate from "../../page/educationCreate";
import BtnRegular from "../../common/button/btnRegular";
import EducationEdit from "../../page/educationEdit";
import Modal from "../../common/form/modal";
// store
import { getEducations, removeEducation } from "../../../store/education.store";
import { getEmployees } from "../../../store/employees.store";
import Loader from "../../common/loader";

const EducationEditor = ({ isModalBtn }) => {
  const [selectedEducationIdByRow, setSelectedEducationIdByRow] = useState("");
  const educations = useSelector(getEducations());
  const employees = useSelector(getEmployees());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectEducationById = (id) => {
    if (selectedEducationIdByRow === id) {
      return setSelectedEducationIdByRow("");
    } else setSelectedEducationIdByRow(id);
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

  const handleDeleteEducation = () => {
    const checkEducation = (obj) => obj.education === selectedEducationIdByRow;
    const hasEducation = employees.some(checkEducation);
    !hasEducation
      ? dispatch(removeEducation(selectedEducationIdByRow))
      : alert("Образование назначено сотруднику и не может быть удалено!");
    setSelectedEducationIdByRow("");
  };

  return (
    <div className="container-fluid p-3 border rounded mt-3">
      <Modal componentId="educationCreate" component={<EducationCreate />} />
      <Modal
        componentId="educationEdit"
        component={<EducationEdit id={selectedEducationIdByRow} />}
      />
      <div className="pb-3">
        <h2>Редактор уровня образования</h2>
      </div>
      <div className="d-flex flex-row justify-content-center ">
        <BtnBigWithIcon
          classNameBtn="btn btn-info"
          classNameIcon="bi bi-arrow-repeat"
          btnText="Редактировать"
          disabled={!selectedEducationIdByRow && true}
          toggleModal="modal"
          modalTargetId="#educationEdit"
        />
        <BtnBigWithIcon
          classNameBtn="btn btn-success"
          classNameIcon="bi bi-plus-square"
          btnText="Добавить запись"
          isModal="modal"
          modalTargetId="#educationCreate"
        />
        <BtnBigWithIcon
          classNameBtn="btn btn-danger"
          classNameIcon="bi bi-trash3"
          btnText="Удалить запись"
          disabled={!selectedEducationIdByRow && true}
          onClick={handleDeleteEducation}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center employees-table__container border rounded mt-3 mb-3">
        {educations ? (
          <EducationTable
            educations={educations}
            onSelectedRow={handleSelectedRow}
            selectedEducationIdByRow={selectedEducationIdByRow}
            onSelectEducationById={handleSelectEducationById}
          />
        ) : (
          <Loader />
        )}
      </div>

      <div className="d-flex justify-content-end">
        {!isModalBtn ? (
          <BtnRegular
            text="Назад"
            className="btn btn-secondary"
            disabled={false}
            icon="bi bi-arrow-left-square"
            onClick={() => navigate(-1)}
          />
        ) : (
          <BtnRegular
            text="Закрыть"
            className="btn btn-danger"
            disabled={false}
            icon="bi bi-x-lg"
            toggleModal="modal"
            modalTargetId="#educationEditor"
          />
        )}
      </div>
    </div>
  );
};

export default EducationEditor;
