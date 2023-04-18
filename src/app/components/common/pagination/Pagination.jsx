import React from "react";
import "./styles.css";
import _ from "lodash";

const Pagination = ({ itemsCount, pageSize, currentPage, setCurrentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  const pages = _.range(1, pageCount + 1);

  const hanglePageChangeNext = () => {
    const lastPage = pages[pages.length - 1];
    if (currentPage !== lastPage) return setCurrentPage(currentPage + 1);
  };

  const hanglePageChangePrevious = () => {
    if (currentPage !== 1) return setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container d-flex justify-content-center p-0">
      <nav aria-label="Page navigation example">
        <ul className="pagination m-0">
          <button
            className="page-link border-0"
            aria-label="Previous"
            onClick={hanglePageChangePrevious}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            className="page-link border-0"
            aria-label="Next"
            onClick={hanglePageChangeNext}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
