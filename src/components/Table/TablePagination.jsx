import React from "react";
import TablePagination from "@material-ui/core/TablePagination";

export default function CustomTablePagination({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  count
}) {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      count={count}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}
