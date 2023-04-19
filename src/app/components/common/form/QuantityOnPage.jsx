import React from "react";

const QuantityOnPage = ({ pageSize, setPageSize, label, name, options }) => {
  
  const handleChange = ({ target }) => {
    setPageSize(Number(target.value));
    localStorage.setItem(name, JSON.stringify(Number(target.value)));
  };

  return (
    <form>
      <div className="d-flex align-items-center text-nowrap">
        <div className="me-1">
          <label>{label}</label>
        </div>
        <div>
          <select
            className="form-select border-0"
            id={name}
            name={name}
            style={{ minWidth: "70px" }}
            aria-label="Default select example"
            onChange={handleChange}
            value={pageSize}
          >
            {options.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
};

export default QuantityOnPage;
