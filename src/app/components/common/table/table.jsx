import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

const Table = ({
  onSort,
  selectedSort,
  columns,
  data,
  children,
  onSelectedRow,
}) => {
  return (
    <table className="table table-hover">
      {children || (
        <>
          <TableHeader
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
          />
          <TableBody
            columns={columns}
            data={data}
            onSelectedRow={onSelectedRow}
          />
        </>
      )}
    </table>
  );
};

export default Table;
