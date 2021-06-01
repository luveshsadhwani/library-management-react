import React, { useState } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TablePagination,
} from "@material-ui/core";

// For ActionButtons
import "../../container/customcss/dashboard.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { Link } from "react-router-dom";
import axios from "axios";
import { createStandaloneToast} from "@chakra-ui/react"

// Pass custom headers as JSX children

const TableHeader = (props) => {
  const { headers } = props;
  return (
    <TableHead>
      <TableRow>
        {headers.map((column, index) => (
          <TableCell key={`header${index}`}>{column.name}</TableCell>
        ))}
        {props.children && <TableCell>{props.children}</TableCell>}
      </TableRow>
    </TableHead>
  );
};

// Data rendering in tables, pass custom columns as JSX children
// OUR BUTTONS ARE HERE

const TableContent = (props) => {
  const { data, headers, page, rowsPerPage, pagination, actionButtons } = props;

  const toast =  createStandaloneToast()

  // THIS IS WHERE WE DELETE DATA FROM OUR API
  const ActionButtons = ({ id, isbn }) => {
    const deletebook = async (id) => {
      await axios.post(`http://localhost:8000/deleteentry`, null, { params:{
        entry_id: id
      }})
      .then(window.location.reload())
      .catch(err=>{
        toast({
            title: "Error Pushing Data",
            description: `Error: ${err}`,
            status: "error",
            variant: "solid",
            duration: 1500,
            position: "top-right",
            isClosable: false,
          })
                  })

      //window.location.reload();
    };

    return (
      <TableCell key={`btns-${id}`}>
        <Link className="btn btn-primary mr2 mt2" to={`/home/view/${isbn}`}>
          <VisibilityIcon />
        </Link>
        <Link
          className="btn btn-outline-primary mr2 mt2"
          to={`/home/edit/${id}`}
        >
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
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  // This function will render rows depending on rowsPerPage
  const renderRowsPerPage = () => {
    return rowsPerPage > 0 && pagination
      ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : data;
  };

  // This function will render empty rows to keep paginator at the bottom of the table
  const renderEmptyRows = () => {
    return (
      emptyRows > 0 &&
      pagination && (
        <TableRow stlye={{ height: 53 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )
    );
  };

  const renderRow = (rowObj, rowIndex, headers) => {
    const id = rowObj["id"];
    const isbn = rowObj["Isbn"];
    return (
      <TableRow key={`row${rowIndex}`}>
        {headers.map((column, columnIndex) => (
          <TableCell key={`col${columnIndex}`}>{rowObj[column.prop]}</TableCell>
        ))}
        {actionButtons && <ActionButtons id={id} isbn={isbn} />}
      </TableRow>
    );
  };
  return (
    <TableBody>
      {renderRowsPerPage().map((rowObj, rowIndex) =>
        renderRow(rowObj, rowIndex, headers)
      )}
      {renderEmptyRows()}
    </TableBody>
  );
};

// Table Paginator Component
const TablePaginator = ({
  count,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) => {
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          count={count}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableRow>
    </TableFooter>
  );
};

/* 
Table component props description;
data is fetched from the DB, headers are the column names
customHeader takes in 1 additional header, following the same object structure
as headers 
actionButtons will render the edit, view and delete buttons...
If I can refactor this, I will make it so the buttons can be defined in Dashboard.jsx and passed through this table as a child
*/
export default function Table1({
  data = [],
  customData,
  headers = [],
  customHeader = {},
  pagination = false,
  actionButtons = false,
}) {
  //Configuration for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const count = data.length;

  //Finished Configuration
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHeader headers={headers}>{customHeader.name}</TableHeader>
        <TableContent
          data={data}
          headers={headers}
          page={page}
          rowsPerPage={rowsPerPage}
          pagination={pagination}
          actionButtons={actionButtons}
        >
          {customData}
        </TableContent>
        {pagination && (
          <TablePaginator
            count={count}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        )}
      </Table>
    </TableContainer>
  );
}
