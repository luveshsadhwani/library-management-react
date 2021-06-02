import React, { useState, useEffect } from "react";
import axios from "axios";
import "./customcss/dashboard.css";

// import SearchBar from "../components/SearchBar/SearchBar";
import TableIssues from "../components/Table/TableIssues";


export default function Dashboard() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    loaddata();
  }, []);

  const handleChangeFilter = (filter) => setSearchFilter(filter);

  const handleSubmitQuery = (querySubmit) => setQuery(querySubmit);

  // HERE IS WHERE WE GET ALL OUR DATA FROM OUR API
  const loaddata = async () => {
    await axios.get("http://localhost:8000/data")
    .then(response=>setData(response.data.reverse()))
    //setData(resultdata.data.reverse());
  };

  // we chould replace this with a function that extracts the headers from the data
  const dataHeaders = [
    {
      name: "#",
      prop: "id",
    },
    {
      name: "Title",
      prop: "booktitle",
    },
    {
      name: "Issued to",
      prop: "Subject",
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
      {/* <SearchBar
        filterOptions={dataHeaders}
        searchFilter={searchFilter}
        handleChangeFilter={handleChangeFilter}
        onSubmit={handleSubmitQuery}
      /> */}
      <TableIssues
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