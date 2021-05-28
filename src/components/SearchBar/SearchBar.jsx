import React, { useState } from "react";
import { Grid } from "@material-ui/core";

import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";
import SearchFilter from "./SearchFilter";

export default function SearchBar(props) {
  const { filterOptions, searchFilter, handleChangeFilter, onSubmit } = props;

  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = () => onSubmit(searchInput.toLowerCase());

  const handleChangeQuery = (e) => setSearchInput(e.target.value);


  return (
    <div>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <SearchButton handleSubmit={handleSubmit} />
        </Grid>
        <Grid item>
          <SearchInput handleChangeQuery={handleChangeQuery} />
        </Grid>
        <Grid item>
          <SearchFilter
            searchFilter={searchFilter}
            filterOptions={filterOptions}
            handleChangeFilter={handleChangeFilter}
          />
        </Grid>
      </Grid>
    </div>
  );
}
