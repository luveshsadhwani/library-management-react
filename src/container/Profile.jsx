import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  IconButton,
  createMuiTheme,
  MuiThemeProvider,
  makeStyles,
  TextField,
  Button,
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

const UserInfoFormItem = (formState, onChange, propt, index) => {
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
      <Paper className={classes.form}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">{mapInformation[propt]}</Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            defaultValue={formState[propt]}
            name={Object.keys(user)[index]}
            onChange={onChange}
          />
        </Grid>
      </Paper>
    </Grid>
  );
};

const UserInfoGridItem = (formState, propt, index) => {
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
          <Typography variant="h6">{formState[propt]}</Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default function Profile() {
  const [isForm, setIsForm] = useState(false);
  const [formInput, setFormInput] = useState(user);

  // ADD AJAX CALLS HERE IN A USE EFFECT HOOK, use api call to update formInput as the user info, once it works replace the initial state of form info with a blank string 

  const handleEdit = () => setIsForm(true);

  const handleChange = (e) => {
    const value = e.target.value;
    setFormInput((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = () => {
    setFormInput(formInput);
    setIsForm(false);
  };

  const toggleRender = () => {
    if (isForm) {
      return Object.keys(user).map((key, index) =>
        UserInfoFormItem(formInput, handleChange, key, index)
      );
    }

    return Object.keys(user).map((key, index) =>
      UserInfoGridItem(formInput, key, index)
    );
  };

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
                  style={{ backgroundColor: "#594f8d", marginLeft: "1rem" }}
                  onClick={handleEdit}
                >
                  <EditIcon style={{ color: "white" }} />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4">{`${user.lastName}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
          {toggleRender()}
          <Grid item xs={12} align="center">
            {!isForm ? (
              <div></div>
            ) : (
              <Button
                style={{ color: "white", backgroundColor: "#594f8d" }}
                onClick={handleSubmit}
              >
                SAVE
              </Button>
            )}
          </Grid>
        </Grid>
      </MuiThemeProvider>
    </div>
  );
}
