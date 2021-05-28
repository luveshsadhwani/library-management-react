import React from "react";
import {
  Grid,
  Paper,
  Typography,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

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

const style = {
  backgroundColor: "#594f8d",
  color: "white",
  padding: "1em",
  width: "60%",
};

const UserInfoGridItem = (propt, index) => {
  const mapInformation = {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    employeeId: "Employee ID",
    designation: "Designation",
  };

  return (
    <Grid
      item
      xs={6}
      key={index}
      container
      direction="column"
      alignItems="center"
    >
      <Paper style={style}>
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
      <Grid container spacing={2}>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={4} align="right">
            <Paper
              style={{ border: "2px solid", height: "200px", width: "200px" }}
            >
              Profile Picture
            </Paper>
          </Grid>
          <Grid item xs={8} alignt="left" container>
            <Grid item xs={4} container>
              <Grid item xs={12} container alignItems="flex-end">
                <Typography variant="h4">{`${user.firstName}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h4">{`${user.lastName}`}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={8} container alignItems="center">
              <IconButton style={{ backgroundColor: "#594f8d", padding: '2%'}}>
                <EditIcon style={{ color: 'white' }}/>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        {Object.keys(user).map((key, index) => UserInfoGridItem(key, index))}
      </Grid>
    </div>
  );
}
