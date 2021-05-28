import React from "react";
import { Select, MenuItem } from "@material-ui/core";

export default function SearchFilter(props) {
  const { searchFilter, handleChangeFilter, filterOptions } = props;

  const handleChange = (e) => handleChangeFilter(e.target.value);

  return (
    <Select value={searchFilter} onChange={handleChange}>
      {filterOptions.slice(1).map((d, i) => (
        <MenuItem key={i} value={d.prop}>
          {d.name}
        </MenuItem>
      ))}
    </Select>
  );
}
