import React from "react";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchButton(props) {
  const { handleSubmit } = props;
  return (
    <IconButton onClick={handleSubmit}>
      <SearchIcon />
    </IconButton>
  );
}
