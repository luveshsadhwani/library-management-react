import React, { useState, useEffect, cloneElement } from "react";
import axios from "axios";
import "./customcss/dashboard.css";

import SearchBar from "../components/SearchBar/SearchBar";
import Table1 from "../components/Table/Table1";

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";

import { Link } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    loaddata();
  }, []);

  const handleChangeFilter = (filter) => setSearchFilter(filter);

  const handleSubmitQuery = (querySubmit) => setQuery(querySubmit);

  // Requset to api
  const loaddata = async () => {
    const resultdata = await axios.get("http://localhost:8000/books");
    setData(resultdata.data.reverse());
  };

  // we chould replace this with a function that extracts the headers from the data
  const dataHeaders = [
    {
      name: "#",
      prop: "id",
    },
    {
      name: "Author",
      prop: "authorname",
    },
    {
      name: "Title",
      prop: "booktitle",
    },
    {
      name: "Subject",
      prop: "Subject",
    },
    {
      name: "Publisher",
      prop: "Publisher",
    },
    {
      name: "ISBN",
      prop: "Isbn",
    },
  ];

  return (
    <div className="py-4 mr2 ml2">
      <div>
        <h1 className="center">Welcome to Dashboard</h1>
        <h3 className="center">{`Total Entities ${data.length}`}</h3>
      </div>
      <SearchBar
        filterOptions={dataHeaders}
        searchFilter={searchFilter}
        handleChangeFilter={handleChangeFilter}
        onSubmit={handleSubmitQuery}
      />
      <Table1
        data={
          query && searchFilter
            ? data.filter((d) => d[searchFilter].toLowerCase().includes(query))
            : data
        }
        headers={dataHeaders}
        customHeader={{ name: "Actions", prop: "actions" }}
        pagination
        actionButtons
      />
    </div>
  );
}
