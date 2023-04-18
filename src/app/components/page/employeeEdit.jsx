import React, { useEffect, useState } from "react";
// libraries
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// UI
import EmployeeForm from "../UI/employeeForm";
// utils
import { validator } from "../../utils/validator";
// store
import { getEmployeeById, updateEmployee } from "../../store/employees.store";
import { getEducations } from "../../store/education.store";

const EmployeeEdit = () => {
  const { employeeId } = useParams();
  const educations = useSelector(getEducations());
  const [errors, setErrors] = useState({});
  const employee = useSelector(getEmployeeById(employeeId));
  const [data, setData] = useState({
    lastName: employee?.name.lastName || "",
    firstName: employee?.name.firstName || "",
    surName: employee?.name.surName || "",
    education: employee?.education || "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isValid = Object.keys(errors).length === 0;
  const validatorConfig = {
    lastName: {
      isRequired: {
        message: "Фамилия обязательна для заполнения",
      },
      isNoDigitalSymbol: {
        message: "Введите фамилию без цифр",
      },
      isCirillic: {
        message: "Введите фамилию только русскими буквами",
      },
    },
    firstName: {
      isRequired: {
        message: "Имя обязательно для заполнения",
      },
      isNoDigitalSymbol: {
        message: "Введите имя без цифр",
      },
      isCirillic: {
        message: "Введите имя только русскими буквами",
      },
    },
    surName: {
      isRequired: {
        message: "Отчество обязательно для заполнения",
      },
      isNoDigitalSymbol: {
        message: "Введите отчество без цифр",
      },
      isCirillic: {
        message: "Введите отчество только русскими буквами",
      },
    },
    education: {
      isRequired: {
        message: "Выберите тип образования",
      },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleClearEducation = () => {
    setData((prevState) => ({ ...prevState, education: "" }));
  };

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const transformData = (data) => {
    const editedEmployee = {
      _id: employeeId,
      education: data.education,
      name: {
        lastName: data.lastName,
        firstName: data.firstName,
        surName: data.surName,
      },
    };
    return editedEmployee;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(updateEmployee(employeeId, transformData(data))).then(() =>
      navigate("/")
    );
  };

  useEffect(() => {
    validate();
  }, [data]);

  return (
    <div className="container-fluid p-3 border rounded mt-3">
      <div className="pb-3">
        <h2>Редактировать сотрудника</h2>
      </div>
      <EmployeeForm
        data={data}
        onChange={handleChange}
        errors={errors}
        educations={educations !== null && educations}
        isValid={isValid}
        onClearEducation={handleClearEducation}
        onSubmit={handleSubmit}
        onPreviousPage={() => navigate(-1)}
        btnEditText="Сохранить"
        isEdit="true"
        employeeId={employeeId}
      />
    </div>
  );
};

export default EmployeeEdit;
