import React, { useState, useEffect } from "react";
import axios from "axios";
import "./customcss/dashboard.css";

import SearchBar from "../components/SearchBar/SearchBar";
import CustomTable from "../components/Table/Table";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [searchCol, setSearchCol] = useState("");

  useEffect(() => {
    loaddata();
  }, []);

  const loaddata = async () => {
    const resultdata = await axios.get("http://localhost:8000/books");
    setBooks(resultdata.data);
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
      </div>
      <SearchBar
        header={dataHeaders}
        searchCol={searchCol}
        setSearchCol={setSearchCol}
        setQuery={setQuery}
      />
      <CustomTable
        data={
          query && searchCol
            ? books.filter((d) => d[searchCol].toLowerCase().includes(query))
            : books
        }
        header={dataHeaders}
      />
    </div>
  );
}
