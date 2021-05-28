import React from "react";
import { TextField } from "@material-ui/core";

export default function SearchInput(props) {
  const { handleChangeQuery } = props;
  
    return (
    <TextField id="search-bar" label="Search" onChange={handleChangeQuery} />
  );
}
