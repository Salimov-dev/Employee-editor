import React from "react";
// libraries
import { useNavigate } from "react-router-dom";
// components
import BtnOpenEditEducation from "./button/btnOpenEditEducation";
import BtnClearEducation from "./button/btnClearEducation";
import SelectField from "../common/form/selectField";
import BtnRegular from "../common/button/btnRegular";
import InputField from "../common/form/inputField";
// utils
import { makeUpperCaseFirstLetter } from "../../utils/makeUpperCaseFirstLetter";

const EmployeeForm = ({
  data,
  onChange,
  errors,
  educations,
  isValid,
  onClearEducation,
  onSubmit,
  btnCreateText,
  btnEditText,
  employeeId,
  isEdit,
}) => {
  const navigate = useNavigate();

  return (
    <form onSubmit={onSubmit}>
      <InputField
        span="Ф"
        placeholder="Фамилия"
        name="lastName"
        value={makeUpperCaseFirstLetter(data?.lastName)}
        onChange={onChange}
        hasValidation={true}
        error={errors.lastName}
      />
      <InputField
        span="И"
        placeholder="Имя"
        name="firstName"
        value={makeUpperCaseFirstLetter(data?.firstName)}
        onChange={onChange}
        error={errors.firstName}
      />
      <InputField
        span="О"
        placeholder="Отчество"
        name="surName"
        value={makeUpperCaseFirstLetter(data?.surName)}
        onChange={onChange}
        error={errors.surName}
      />

      <div className="d-flex justify-content-between">
        <div className="container-fluid p-0">
          <SelectField
            name="education"
            defaultOption="Выберите образование..."
            value={employeeId ? data?.education : data?.education}
            options={educations}
            onChange={onChange}
            error={errors.education}
          />
        </div>
        <div className="d-flex align-items-start">
          <BtnOpenEditEducation
            isModal="modal"
            modalTargetId="#educationEditor"
          />
          <BtnClearEducation onClearEducation={onClearEducation} data={data} />
        </div>
      </div>

      <div className="d-flex justify-content-end">
        <BtnRegular
          text={employeeId ? btnEditText : btnCreateText}
          type="submit"
          className="btn btn-success"
          disabled={!isValid && true}
          isModal="modal"
        />
        <BtnRegular
          text="Отмена"
          className="btn btn-danger"
          disabled={false}
          icon="bi bi-x-lg"
          isModal="modal"
          onClick={isEdit ? () => navigate(-1) : null}
        />
      </div>
    </form>
  );
};

export default EmployeeForm;
