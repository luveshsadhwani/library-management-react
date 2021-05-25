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

const Buttons = ({ index }) => (
  <TableCell key={`btns-${index}`}>
    <Link className="btn btn-primary mr2" to="/home/dashboard">
      View
    </Link>
    <Link
      className="btn btn-outline-primary mr2"
      to={`/home/edit/${index + 1}`}
    >
      Edit
    </Link>
    <Link className="btn btn-danger mr2" to="/home/dashboard">
      Delete
    </Link>
  </TableCell>
);

const customRow = (d, i, header) => (
  <TableRow key={`row-${i}`}>
    {header.map((s, k) => (
      <TableCell key={`row-${k}`}>{d[s.prop]}</TableCell>
    ))}
    <Buttons index={i}/>
  </TableRow>
);

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
