import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import userAvatar from "../container/assets/user1avatar.jpg";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

//dummy data for users
const usersData = [
  {
    firstName: "Luvesh",
    lastName: "Sadhwani",
    email: "luveshsadhwani@gmail.com",
    phone: "123456789",
    employeeId: "123",
    designation: "Some Position",
    //   imagelink: "This is my image",
  },
  {
    firstName: "Luvesh2",
    lastName: "Sadhwani2",
    email: "luveshsadhwani2@gmail.com",
    phone: "223456789",
    employeeId: "223",
    designation: "Some Position2",
    //   imagelink: "This is my image",
  },
  {
    firstName: "Luvesh3",
    lastName: "Sadhwani3",
    email: "luveshsadhwani2@gmail.com",
    phone: "223456789",
    employeeId: "323",
    designation: "Some Position3",
    //   imagelink: "This is my image",
  },
  {
    firstName: "Luvesh4",
    lastName: "Sadhwani4",
    email: "luveshsadhwani2@gmail.com",
    phone: "223456789",
    employeeId: "423",
    designation: "Some Position4",
    //   imagelink: "This is my image",
  },
  {
    firstName: "Luvesh5",
    lastName: "Sadhwani5",
    email: "luveshsadhwani2@gmail.com",
    phone: "223456789",
    employeeId: "523",
    designation: "Some Position5",
    //   imagelink: "This is my image",
  },
];

const useStyles = makeStyles({
  deleteButton: {
    color: "#594f8d",
  },
  root: {
    width: "30rem",
    margin: "1rem auto",
    borderColor: "#594f8d",
  },
  title: {
    color: "#594f8d",
  },
  dialogTitle: {
    color: "red",
  },
  dialogText: {
    color: "black",
  },
});


export default function Settings() {
  const [users, setUsers] = useState(usersData);

  const classes = useStyles();

  // Config for dialog
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const changeUser = (index) => {
    setCurrentUser(index);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const DeleteDialog = ({ user = {} }) => {
    const handleDelete = () => {
      console.log(`${user.firstName} has been deleted`);
      handleCancel();
    };
    return (
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle className={classes.dialogTitle}>
          {`Delete User - ${user.firstName} ${user.lastName}!`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogText}>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  //Finished config

  const UserCard = ({ user, index }) => {
    return (
      <Card className={classes.root} variant="outlined">
        <CardHeader
          className={classes.title}
          avatar={<Avatar alt={user.firstName} src={userAvatar} />}
          title={`${user.firstName} ${user.lastName}`}
          subheader={`${user.employeeId}, ${user.designation}`}
          action={
            <IconButton
              className={classes.deleteButton}
              onClick={() => {
                handleOpen();
                changeUser(index);
              }}
            >
              <DeleteIcon />
            </IconButton>
          }
          titleTypographyProps={{ variant: "h5" }}
        />
      </Card>
    );
  };

  return (
    <div>
      <h1 className="center">User Management</h1>
      <Button variant="contained" color="primary" startIcon={<AddIcon />}>
        Add User
      </Button>
      {users.map((user, index) => (
        <UserCard key={index} user={user} index={index} />
      ))}
      <DeleteDialog user={users[currentUser]} />
    </div>
  );
}
