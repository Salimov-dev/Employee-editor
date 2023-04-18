import React, { useEffect, useState } from "react";
// libraries
import _ from "lodash";
// components
import Table from "../../common/table/table";
import EducationName from "./educationName";
// utils
import { paginate } from "../../../utils/paginate";
import EducationTableFooter from "./educationTableFooter";

const EducationTable = ({
  educations,
  onSelectedRow,
  selectedEducationIdByRow,
  onSelectEducationById,
}) => {
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSizePagination, setPageSizePagination] = useState(
    localStorage.getItem("QuantityObjectsOnPage") || 5
  );

  const sortedEducation = _.orderBy(educations, [sortBy.path], [sortBy.order]);
  let objectsCrop = paginate(sortedEducation, currentPage, pageSizePagination);
  const numberOfEelement = sortedEducation.map((el) => {
    return el._id;
  });

  const columns = {
    number: {
      path: "",
      name: "№",
      component: (el) => numberOfEelement.indexOf(el._id) + 1,
    },
    education: {
      path: "name",
      name: "Образование",
      component: (educ) => (
        <EducationName
          name={educ.name}
          id={educ._id}
          onSelectEducationById={onSelectEducationById}
        />
      ),
    },
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  useEffect(() => {
    setSortBy({ order: "asc", path: "name" });
    setPageSizePagination(localStorage.getItem("QuantityObjectsOnPage") || 5);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSizePagination]);

  return (
    <div className="container p-0">
      <div className="p-3">
        <Table
          onSort={handleSort}
          selectedSort={sortBy}
          columns={columns}
          data={objectsCrop}
          onSelectedRow={onSelectedRow}
        />
      </div>
      <EducationTableFooter
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectedEducationIdByRow={selectedEducationIdByRow}
        sortedEducation={sortedEducation}
        pageSizePagination={pageSizePagination}
        setPageSizePagination={setPageSizePagination}
      />
    </div>
  );
};

export default EducationTable;
