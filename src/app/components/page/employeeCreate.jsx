import React, { useEffect, useState } from "react";
// libraries
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
// components
import Modal from "../common/form/modal";
// utils
import { validator } from "../../utils/validator";
// UI
import EducationEditor from "../UI/educationEditor/educationEditor";
import EmployeeForm from "../UI/employeeForm";
// store
import { createEmployee } from "../../store/employees.store";
import { getEducations } from "../../store/education.store";

const EmployeeCreate = () => {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    lastName: "",
    firstName: "",
    surName: "",
    education: "",
  });
  const educations = useSelector(getEducations());
  const dispatch = useDispatch();
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

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const transformData = (data) => {
    const newEmployee = {
      _id: nanoid(),
      education: data.education,
      name: {
        lastName: data.lastName,
        firstName: data.firstName,
        surName: data.surName,
      },
    };
    return newEmployee;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    dispatch(createEmployee(transformData(data)));
  };

  const handleClearEducation = () => {
    setData((prevState) => ({ ...prevState, education: "" }));
  };

  useEffect(() => {
    validate();
  }, [data]);

  return (
    <>
      <Modal
        componentId="educationEditor"
        component={
          <EducationEditor isModalBtn="true" modalTargetId="#educationEditor" />
        }
      />
      <div className="pb-3">
        <h2>Добавить нового сотрудника</h2>
      </div>
      <EmployeeForm
        data={data}
        onChange={handleChange}
        errors={errors}
        educations={educations !== null && educations}
        isValid={isValid}
        onClearEducation={handleClearEducation}
        onSubmit={handleSubmit}
        btnCreateText="Создать"
      />
    </>
  );
};

export default EmployeeCreate;
