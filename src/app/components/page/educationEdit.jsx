import React, { useEffect, useState } from "react";
// libraries
import { useDispatch, useSelector } from "react-redux";
// components
import BtnRegular from "../common/button/btnRegular";
import InputField from "../common/form/inputField";
// utils
import { validator } from "../../utils/validator";
import { makeUpperCaseFirstLetter } from "../../utils/makeUpperCaseFirstLetter";
// store
import { getEducationById, updateEducation } from "../../store/education.store";

const EducationEdit = ({ id }) => {
  const dispatch = useDispatch();
  const education = useSelector(getEducationById(id));
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({ education: "" });
  const isValid = Object.keys(errors).length === 0;

  const validatorConfig = {
    education: {
      isRequired: {
        message: "Введите тип образования",
      },
      isNoDigitalSymbol: {
        message: "Введите тип образования без цифр",
      },
      isCirillic: {
        message: "Введите тип образования только русскими буквами",
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
    const editedEmployee = {
      name: data.education,
      _id: id,
    };
    return editedEmployee;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(updateEducation(id, transformData(data)));
  };

  useEffect(() => {
    education !== undefined && setData({ education: `${education.name}` });
  }, [id]);

  useEffect(() => {
    validate();
  }, [data]);

  return (
    <>
      <div className="pb-3">
        <h2>Редактировать образование</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <InputField
          placeholder="Введите тип образования"
          name="education"
          value={makeUpperCaseFirstLetter(data.education)}
          onChange={handleChange}
          error={errors.education}
        />
        <div className="d-flex justify-content-end">
          <BtnRegular
            text={!education ? "Создать" : "Сохранить"}
            type="submit"
            className="btn btn-success"
            disabled={!isValid && true}
            toggleModal="modal"
            modalTargetId="#educationEdit"
          />
          <BtnRegular
            text="Отмена"
            className="btn btn-danger"
            disabled={false}
            icon="bi bi-x-lg"
            toggleModal="modal"
            modalTargetId="#educationEdit"
          />
        </div>
      </form>
    </>
  );
};

export default EducationEdit;
