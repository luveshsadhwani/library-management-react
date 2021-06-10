import React, { useEffect, useState } from "react";
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
import { createStandaloneToast } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

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

const UserInfoFormItem = (userInfo, onChange, propt, index) => {
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
            defaultValue={userInfo[propt]}
            name={Object.keys(userInfo)[index]}
            onChange={onChange}
          />
        </Grid>
      </Paper>
    </Grid>
  );
};

const ProfileHeader = ({ userInfo, handleEdit }) => {
  return (
    <Grid item xs={12} container spacing={2}>
      <Grid item sm={6} md={4} align="right">
        <Paper style={{ border: "2px solid", height: "200px", width: "200px" }}>
          Profile Picture
        </Paper>
      </Grid>
      <Grid item sm={6} md={8} alignt="left" container>
        <Grid item xs={12} container alignItems="flex-end">
          <Typography variant="h4">{userInfo.firstname}</Typography>
          <IconButton
            style={{ backgroundColor: "#594f8d", marginLeft: "1rem" }}
            onClick={handleEdit}
          >
            <EditIcon style={{ color: "white" }} />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">{userInfo.lastname}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default function Profile() {
  // !! WE MUST FOLLOW THE EXACT STRUCTURE OF THE USER DATA RETURNED FROM THE API
  const defaultUserInfo = {
    empid: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    designation: "",
  };

  const toast = createStandaloneToast();
  const [formView, setFormView] = useState(false);
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  let history = useHistory();
  let empId;
  // ADD AJAX CALLS HERE IN A USE EFFECT HOOK, use api to retrieve and update userInfo

  useEffect(() => {
    const retrieveUser = async () => {
      try {
        empId = localStorage.getItem("emPID");
      } catch (error) {
        history.push("/")
      }
      await axios
        .get(`http://localhost:8000/employee_info/`, {
          params: {
            employee_id: empId,
          },
        })
        .then((response) => setUserInfo(response.data));
    };

    retrieveUser();
  }, []);
  const handleEdit = () => setFormView(true);

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(userInfo);
    // process data for employee id
    let params = {
      employee_id: userInfo.empid,
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      email: userInfo.email,
      phone: userInfo.phone,
      designation: userInfo.designation
    };
    console.log(params);

    await axios
      .post(`http://localhost:8000/update_employee_info`, null, {
        params: params
      })
      .then(() => {
        toast({
          title: `Successfully updated user ${userInfo.firstname} ${userInfo.lastname}`,
          description: `ID: ${userInfo.empid}`,
          status: "success",
          variant: "solid",
          duration: 3000,
          position: "top-right",
          isClosable: false,
        });
      })
      .catch((err) => {
        toast({
          title: "Error Pushing Data",
          description: `Error: ${err}`,
          status: "error",
          variant: "solid",
          duration: 3000,
          position: "top-right",
          isClosable: false,
        });
      })
      .finally(() => setFormView(false));
  };

  const toggleRenderForm = () => {
    return formView
      ? Object.keys(defaultUserInfo).map((key, index) =>
          UserInfoFormItem(userInfo, handleChange, key, index)
        )
      : Object.keys(defaultUserInfo).map((key, index) =>
          UserInfoContentItem(userInfo, key, index)
        );
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <ProfileHeader userInfo={userInfo} handleEdit={handleEdit} />
        {toggleRenderForm()}
        <Grid item xs={12} align="center">
          {formView && (
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
  );
}
