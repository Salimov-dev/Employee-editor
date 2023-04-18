import React from "react";
import QuantityOnPage from "../../common/form/QuantityOnPage";
import Pagination from "../../common/pagination/Pagination";

const EducationTableFooter = ({
  selectedEducationIdByRow,
  sortedEducation,
  pageSizePagination,
  setPageSizePagination,
  currentPage,
  setCurrentPage,
}) => {
  const count = sortedEducation.length;
  const pageQuantity = Math.ceil(sortedEducation.length / pageSizePagination);

  return (
    <div className="d-flex justify-content-between align-items-center border-top p-3">
      <div>Выбрано: {selectedEducationIdByRow ? "1 строка" : "0 строк"}</div>
      <div className="d-flex justify-content-between align-items-center ">
        <QuantityOnPage
          pageSize={pageSizePagination}
          setPageSize={setPageSizePagination}
          label="Строк на странице: "
          name="QuantityObjectsOnPage"
          options={[5, 10, 15, 25]}
        />
        <div className="text-nowrap ps-3">
          {`${currentPage} - ${pageQuantity} из ${pageQuantity}`}
        </div>
        <Pagination
          itemsCount={count}
          pageSize={pageSizePagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default EducationTableFooter;
