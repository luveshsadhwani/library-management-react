import React from "react";
import {
  Grid,
  Paper,
  Typography,
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
} from "@material-ui/core";

let theme = createMuiTheme();
theme.typography.h6 = {
  fontSize: "1rem",
  "@media (min-width:900px)": {
    fontSize: "1.05rem",
  },
  "@media (min-width:1000px)": {
    fontSize: "1.1rem",
  },
  "@media (min-width:1200px)": {
    fontSize: "1.2rem",
  },
  "@media (min-width:1300px)": {
    fontSize: "1.25rem",
  },
};

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#594f8d",
    color: "white",
    padding: "1em",
    width: "60%",
    [theme.breakpoints.down(1200)]: {
      width: "70%",
    },
    [theme.breakpoints.down(1000)]: {
      width: "80%",
    },
    [theme.breakpoints.down(900)]: {
      width: "90%",
    },
    [theme.breakpoints.down(800)]: {
      width: "100%",
    },
  },
  form: {
    backgroundColor: "white",
    color: "#594f8d ",
    padding: "1em",
    width: "60%",
    [theme.breakpoints.down(1200)]: {
      width: "70%",
    },
    [theme.breakpoints.down(1000)]: {
      width: "80%",
    },
    [theme.breakpoints.down(900)]: {
      width: "90%",
    },
    [theme.breakpoints.down(800)]: {
      width: "100%",
    },
  },
}));

const mapInformation = {
  firstname: "First Name",
  lastname: "Last Name",
  email: "Email",
  phone: "Phone",
  empid: "Employee ID",
  designation: "Designation",
};

const UserInfoContentItem = (userInfo, propt, index) => {
  const classes = useStyles();
  return (
    <Grid
      item
      xs={6}
      key={`display-${index}`}
      container
      direction="column"
      alignItems="center"
    >
      <Paper className={classes.paper}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">{mapInformation[propt]}</Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6">{userInfo[propt]}</Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default function ProfileView(props) {
  // !! WE MUST FOLLOW THE EXACT STRUCTURE OF THE USER DATA RETURNED FROM THE API
  const { userInfo } = props;

  const renderUserInfo = () => {
    return Object.keys(userInfo).map((key, index) =>
      UserInfoContentItem(userInfo, key, index)
    );
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Grid container spacing={2}>
        {renderUserInfo()}
      </Grid>
    </MuiThemeProvider>
  );
}
