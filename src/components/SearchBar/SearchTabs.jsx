import React, { useState } from "react";
import PropTypes from "prop-types";
// import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Tabs,
  Tab,
  Box,
  makeStyles,
  TextField,
  Grid,
} from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

function TabPanel(props) {
  const { value, index, headers, onSubmit, handleChangeSearch, searchInput } = props;

  const SearchButton = () => {
    return (
      <IconButton
        onClick={() => {
          onSubmit(searchInput.toLowerCase(), headers[index].prop);
        }}
      >
        <SearchIcon />
      </IconButton>
    );
  };

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && (
        <Box p={3}>
          <Grid container spacing={1} align="center">
            <Grid item xs={4} align="right">
              <SearchButton />
            </Grid>
            <Grid item xs={8} align="left">
              <TextField
                id="search-bar"
                label={`Search for ${headers[index].name}`}
                style={{ bottom: "12px", width: "50%" }}
                value={searchInput}
                onChange={(e) => handleChangeSearch(e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "1rem",
    width: "80%",
    margin: "5rem auto",
  },
  tab: {
    backgroundColor: "#594f8d",
    color: "white",
  },
}));

export default function SearchTabs(props) {
  const { headers, onSubmit } = props;

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [searchInput, setSearchInput] = useState("");

  const handleChangeSearch = (query) => setSearchInput(query);

  const renderTabs = () => {
    return headers.map((header, index) => (
      <Tab label={header.name} key={`tab-${index}`} />
    ));
  };

  const renderTabPanels = (onSubmit, handleChangeSearch) => {
    return headers.map((header, index) => (
      <TabPanel
        value={value}
        index={index}
        key={`tabpanel-${index}`}
        headers={headers}
        onSubmit={onSubmit}
        handleChangeSearch={handleChangeSearch}
        searchInput={searchInput}
      />
    ));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        className={classes.tab}
        value={value}
        onChange={handleChange}
        variant="fullWidth"
      >
        {renderTabs()}
      </Tabs>
      {renderTabPanels(onSubmit, handleChangeSearch)}
    </Paper>
  );
}
