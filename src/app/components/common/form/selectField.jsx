import React from "react";

const SelectField = ({
  name,
  value,
  onChange,
  defaultOption,
  options,
  error,
}) => {
  const optionsArray = Object.keys(options).map((optionName) => ({
    value: options[optionName]._id,
    label: options[optionName].name,
  }));

  const getInputClasses = () => {
    return "form-select" + (error ? " is-invalid" : " is-valid");
  };

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-4 has-validation">
      <select
        className={getInputClasses()}
        onChange={handleChange}
        id={name}
        name={name}
        value={value}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default SelectField;
