import React, { useEffect, useState } from "react";
// libraries
import _ from "lodash";
// components
import EmployeeEducation from "./employeeEducation";
import Table from "../../common/table/table";
import EmployeeName from "./employeeName";

const EmployeesTable = ({ employees, onSelectedRow, onSelectEmployeeById }) => {
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const sortedEmployees = _.orderBy(employees, [sortBy.path], [sortBy.order]);

  const columns = {
    name: {
      path: "name.lastName",
      name: "ФИО",
      component: (employee) => (
        <EmployeeName
          name={employee.name}
          id={employee._id}
          onSelectEmployeeById={onSelectEmployeeById}
        />
      ),
    },
    education: {
      path: "education",
      name: "Образование",
      component: (employee) => (
        <EmployeeEducation
          id={employee.education}
          onSelectEmployeeById={onSelectEmployeeById}
        />
      ),
    },
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  useEffect(() => {
    setSortBy({ order: "asc", path: "name.lastName" });
  }, []);

  return (
    <Table
      onSort={handleSort}
      selectedSort={sortBy}
      columns={columns}
      data={sortedEmployees}
      onSelectedRow={onSelectedRow}
    />
  );
};

export default EmployeesTable;
