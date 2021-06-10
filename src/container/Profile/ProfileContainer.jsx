import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileForm from "./ProfileForm";
import ProfileView from "./ProfileView";

import { Grid, Paper, Typography, IconButton, Modal } from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";


export default function ProfileContainter() {
  const [openModal, setOpenModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    empid: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    designation: "",
  });

  useEffect(() => {
    const retrieveUser = async () => {
      let empId = localStorage.getItem("emPID");

      await axios
        .get(`http://localhost:8000/employee_info/`, {
          params: { employee_id: empId },
        })
        .then((response) => {
          if (response.data) {
            setUserInfo(response.data);
          } else {
            setUserInfo({
              empid: "",
              firstname: "",
              lastname: "",
              email: "",
              phone: "",
              designation: "",
            });
          }
        });
    };

    retrieveUser();
  }, []);

  const handleEdit = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const ProfileHeader = ({ userInfo, handleEdit }) => {
    return (
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

  return (
    <Grid container spacing={2}>
      <ProfileHeader userInfo={userInfo} handleEdit={handleEdit} />
      <ProfileView userInfo={userInfo} />
      <Modal open={openModal} onClose={handleClose}>
        <div>
          <ProfileForm userInfo={userInfo} handleClose={handleClose} />
        </div>
      </Modal>
    </Grid>
  );
}
