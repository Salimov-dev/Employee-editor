import React from "react";

const InputField = ({
  span = false,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
  error,
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : " is-valid");
  };

  return (
    <div className="input-group has-validation mb-2">
      {span && <span className="input-group-text">{span}</span>}
      <input
        id={value}
        name={name}
        value={value}
        type={type}
        className={getInputClasses()}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default InputField;
