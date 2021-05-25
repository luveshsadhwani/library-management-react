import React, { useRef } from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchBar(props) {
  const { header } = props;
  const searchRef = useRef();
  const handleQuery = () => props.setQuery(searchRef.current.value.toLowerCase());
  const handleChangeCol = (e) => props.setSearchCol(e.target.value);

  return (
    <div>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <IconButton onClick={handleQuery}>
            <SearchIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <TextField id="search-bar" label="Search" inputRef={searchRef}/>
        </Grid>
        <Grid item>
          <Select value={props.searchCol} onChange={handleChangeCol}>
            {header.slice(1).map((d, i) => (
              <MenuItem key={i} value={d.prop}>
                {d.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </div>
  );
}
