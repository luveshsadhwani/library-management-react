import React, { useState, useEffect } from "react";
import axios from "axios";
import "./customcss/dashboard.css";

import TableDashboard from "../components/Table/TableDashboard";
import SearchTabs from "../components/SearchBar/SearchTabs";

import { Button, Grid } from "@material-ui/core";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [searchSubmit, setSearchSubmit] = useState(false);

  useEffect(() => {
    // HERE IS WHERE WE GET ALL OUR DATA FROM OUR API
    const loaddata = async () => {
      let params = {
        field: searchFilter,
        val: query,
      };

      await axios
        // .get("http://localhost:8000/data")
        .get("http://localhost:8000/filter_search", {
          params: params,
        })
        .then((response) => setData(response.data.reverse()));
      //setData(resultdata.data.reverse());
    };

    if (searchSubmit && query) {
      loaddata();
    }
  }, [searchSubmit, query, searchFilter]);

  const handleSubmitQuery = (query, filter) => {
    setQuery(query);
    setSearchFilter(filter);
    setSearchSubmit(true);
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
        {searchSubmit && (
          <Grid container>
            <Grid item xs={6} align="left">
              <Button
                style={{ backgroundColor: "#594f8d", color: "white" }}
                onClick={() => setSearchSubmit(false)}
              >
                SEARCH AGAIN
              </Button>
            </Grid>
            <Grid item xs={6} align="right">
              <h3>{`Total Entities ${data.length}`}</h3>
            </Grid>
          </Grid>
        )}
      </div>
      {searchSubmit ? (
        <TableDashboard
          data={
            query && searchFilter
              ? data.filter((d) =>
                  d[searchFilter].toLowerCase().includes(query)
                )
              : data
          }
          headers={dataHeaders}
          customHeader={{ name: "Actions", prop: "actions" }}
          pagination
          actionButtons
        />
      ) : (
        <SearchTabs
          headers={dataHeaders.slice(1)}
          onSubmit={handleSubmitQuery}
        />
      )}
    </div>
  );
}
