import React from "react";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CustomTablePagination from "./TablePagination";

import Paper from "@material-ui/core/Paper";
import "../../container/customcss/dashboard.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import "./table.css";
import axios from "axios";

/// NEW ROUTING RIGHT HERE

const deletebook = async (id) => {
  await axios.delete(`http://localhost:8000/books/${id}`);
  window.location.reload();
};

const Buttons = ({ id, isbn }) => (
  <TableCell key={`btns-${id}`}>
    <Link className="btn btn-primary mr2 mt2" to={`/home/view/${isbn}`}>
      <VisibilityIcon />
    </Link>
    <Link className="btn btn-outline-primary mr2 mt2" to={`/home/edit/${id}`}>
      <EditIcon />
    </Link>
    <button
      className="btn btn-danger mr2 mt2"
      to="/home/dashboard"
      onClick={() => deletebook(id)}
    >
      <DeleteOutlineIcon />
    </button>
  </TableCell>
);

const customRow = (d, i, header) => {
  const rowId = d["id"];
  const isbn = d["Isbn"];
  return (
    <TableRow key={`row-${i}`}>
      {header.map((s, k) => (
        <TableCell key={`row-${k}`}>{d[s.prop]}</TableCell>
      ))}
      <Buttons id={rowId} isbn={isbn} />
    </TableRow>
  );
};

export default function CustomTable({ data, header }) {
  // configuration for Table pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const count = data.length;

  // render empty rows so pagination tool always remains as the last row
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  // finished configuration

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((d, i) => (
              <TableCell key={`header-${i}`}>{d.name}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((d, i) => customRow(d, i, header))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <CustomTablePagination
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          count={count}
        />
      </Table>
    </TableContainer>
  );
}
