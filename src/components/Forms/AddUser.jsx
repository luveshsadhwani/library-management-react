import React, { useState, useEffect } from "react";
import { createStandaloneToast } from "@chakra-ui/react";
// import axios from "axios";
import { useHistory } from "react-router-dom";
// This is where we have out input form

export default function AddUser() {
  const defaultUserInfoState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    employeeId: "",
    designation: "",
  };

  let history = useHistory();

  const toast = createStandaloneToast();
  const [userInfo, setUserInfo] = useState(defaultUserInfoState);

  const handleChange = (e) => {
    const value = e.target.value;
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const submit_entry = async (e) => {
    e.preventDefault();
    //// CONNECTION TO THE CUSTOM API GOES HERE USE AXIOS TO SENT POST REQ
    let datatosend = {
      userInfo,
    };
    console.log(datatosend);
    toast({
      title: `Successfully added ${userInfo.firstName} ${userInfo.lastName}`,
      description: `Employee ID: ${userInfo.employeeId}`,
      status: "success",
      variant: "solid",
      duration: 3000,
      position: "top-right",
      isClosable: false,
    });
    setUserInfo(defaultUserInfoState);
    history.push("/home/settings");
    // // UPDATE WHERE ID
    // await axios
    //   .post(`http://localhost:8000/updateentry`, null, {
    //     params: {
    //       index: id,
    //       authorname: author,
    //       booktitle: bookname,
    //       subject: subject,
    //       publisher: publisher,
    //       isbn: isbnnumber,
    //     },
    //   })
    //   .then(() => {
    //     toast({
    //       title: "Successfully verified data",
    //       description: "Successfully Pushed Data into our database",
    //       status: "success",
    //       variant: "solid",
    //       duration: 1500,
    //       position: "top-right",
    //       isClosable: false,
    //     });
    //   })
    //   .catch((err) => {
    //     toast({
    //       title: "Error Pushing Data",
    //       description: `Error: ${err}`,
    //       status: "error",
    //       variant: "solid",
    //       duration: 1500,
    //       position: "top-right",
    //       isClosable: false,
    //     });
    //   });
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div className="entry">
        <div className="entrycontainer">
          <div className="title">Add New User</div>
          <form onSubmit={submit_entry}>
            <div className="entry-details">
              <div className="entry-box">
                <span className="details">First Name</span>
                <input
                  name={Object.keys(userInfo)[0]}
                  value={userInfo.firstName}
                  placeholder="First Name..."
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="entry-box">
                <span className="details">Last Name</span>
                <input
                  name={Object.keys(userInfo)[1]}
                  value={userInfo.lastName}
                  placeholder="Last Name..."
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="entry-box">
                <span className="details">Email</span>
                <input
                  name={Object.keys(userInfo)[2]}
                  value={userInfo.email}
                  placeholder="Email..."
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="entry-box">
                <span className="details">Phone Number</span>
                <input
                  name={Object.keys(userInfo)[3]}
                  value={userInfo.phone}
                  placeholder="Phone Number..."
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="entry-box">
                <span className="details">Employee ID</span>
                <input
                  name={Object.keys(userInfo)[4]}
                  value={userInfo.employeeId}
                  placeholder="Employee ID..."
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="entry-box">
                <span className="details">Designation</span>
                <input
                  name={Object.keys(userInfo)[5]}
                  value={userInfo.designation}
                  placeholder="Designation..."
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="button">
              <input type="submit" value="Add User" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
