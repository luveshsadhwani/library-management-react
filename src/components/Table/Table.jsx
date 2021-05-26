import React from "react";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "../../container/customcss/dashboard.css";
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const Buttons = ({ id }) => (
  <TableCell key={`btns-${id}`}>
    <Link className="btn btn-primary mr2" to="/home/dashboard">
      <VisibilityIcon/>
    </Link>
    <Link
      className="btn btn-outline-primary mr2"
      to={`/home/edit/${id}`}
    >
      <EditIcon/>
    </Link>
    <Link className="btn btn-danger mr2" to="/home/dashboard">
      <DeleteOutlineIcon/>
    </Link>
  </TableCell>
);

const customRow = (d, i, header) => {
  const rowId = d["id"];
  console.log(rowId);
  return (
    <TableRow key={`row-${i}`}>
      {header.map((s, k) => (
        <TableCell key={`row-${k}`}>{d[s.prop]}</TableCell>
      ))}
      <Buttons id={rowId} />
    </TableRow>
  );
};

export default function CustomTable({ data, header }) {
  console.log(data);
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
        <TableBody>{data.map((d, i) => customRow(d, i, header))}</TableBody>
      </Table>
    </TableContainer>
  );
}
