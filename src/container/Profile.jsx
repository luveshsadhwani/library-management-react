import React from "react";
import {
  Grid,
  Paper,
  Typography,
  IconButton,
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

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

// dummy data
const user = {
  firstName: "Luvesh",
  lastName: "Sadhwani",
  email: "luveshsadhwani@gmail.com",
  phone: "123456789",
  employeeId: "123",
  designation: "Some Position",
  //   imagelink: "This is my image",
};

const mapInformation = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  phone: "Phone",
  employeeId: "Employee ID",
  designation: "Designation",
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
}));

const UserInfoGridItem = (propt, index) => {
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
          <Typography variant="h6">{user[propt]}</Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default function Profile() {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Grid container spacing={2}>
          <Grid item xs={12} container spacing={2}>
            <Grid item sm={6} md={4} align="right">
              <Paper
                style={{ border: "2px solid", height: "200px", width: "200px" }}
              >
                Profile Picture
              </Paper>
            </Grid>
            <Grid item sm={6} md={8} alignt="left" container>
              <Grid item xs={12} container alignItems="flex-end">
                <Typography variant="h4">{`${user.firstName}`}</Typography>
                <IconButton
                  style={{ backgroundColor: "#594f8d", marginLeft: '1rem' }}
                >
                  <EditIcon style={{ color: "white" }} />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4">{`${user.lastName}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
          {Object.keys(user).map((key, index) => UserInfoGridItem(key, index))}
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}
