import React, { useEffect, useState } from "react";
// libraries
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
// components
import BtnRegular from "../common/button/btnRegular";
import InputField from "../common/form/inputField";
// utils
import { makeUpperCaseFirstLetter } from "../../utils/makeUpperCaseFirstLetter";
import { validator } from "../../utils/validator";
// store
import { createEducation } from "../../store/education.store";

const EducationCreate = () => {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    education: "",
  });
  const dispatch = useDispatch();
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
    const newEducation = {
      _id: nanoid(),
      name: data.education,
    };
    return newEducation;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    dispatch(createEducation(transformData(data)));
  };

  useEffect(() => {
    validate();
  }, [data]);

  return (
    <>
      <div className="pb-3">
        <h2>Добавить тип образования</h2>
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
            text="Создать"
            type="submit"
            className="btn btn-success"
            disabled={!isValid && true}
            toggleModal="modal"
            modalTargetId="#educationCreate"
          />
          <BtnRegular
            text="Отмена"
            className="btn btn-danger"
            disabled={false}
            icon="bi bi-x-lg"
            toggleModal="modal"
            modalTargetId="#educationCreate"
          />
        </div>
      </form>
    </>
  );
};

export default EducationCreate;
