import React, { useState } from "react";

import { Formik, Form, useField, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { createStandaloneToast } from "@chakra-ui/react";

const TextField = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <div className="entry-box">
      <label className="details" htmlFor={field.name}>
        {label}
      </label>
      <Field name={field.name} {...props} />
      <ErrorMessage
        name={field.name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </div>
  );
};

export default function EditProfileForm(props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { userInfo, handleClose } = props;

  const textValidation = Yup.string().matches(
    /^[a-zA-Z. ]+$/,
    "No numbers allowed"
  );

  const validate = Yup.object({
    empid: Yup.string()
      .matches(/^#\d{4}$/, "Enter # followed by the 4 Employee ID")
      .required("Required"),
    firstname: textValidation.max(10, "max 10 chars").required("Required"),
    lastname: textValidation.max(20, "max 10 chars").required("Required"),
    email: Yup.string().email("Enter a valid email").required("Required"),
    phone: Yup.string().matches(
      /^03[0-6][0-9]-\d{7}/,
      "Phone number is not valid"
    ),
    designation: textValidation.required("Required"),
  });

  const submit_update = async (values) => {
    const toast = createStandaloneToast();
    //// CONNECTION TO THE CUSTOM API GOES HERE USE AXIOS TO SENT POST REQ
    let params = {
      employee_id: values.empid,
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      phone: values.phone,
      designation: values.designation,
    };

    setIsSubmitted(true);

    // UPDATE WHERE ID
    await axios
      .post(`http://localhost:8000/update_employee_info`, null, {
        params: params,
      })
      .then(() => {
        toast({
          title: `Successfully updated user ${values.firstname} ${values.lastname}`,
          description: `ID: ${values.empid}`,
          status: "success",
          variant: "solid",
          duration: 3000,
          position: "top-right",
          isClosable: false,
        });
        handleClose();
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
      });
  };

  return (
    <div className="entry">
      <div className="entrycontainer">
        <div className="title">Edit Profile </div>
        <Formik
          initialValues={userInfo}
          onSubmit={submit_update}
          validationSchema={validate}
          enableReinitialize={true}
        >
          <Form>
            <div className="entry-details">
              <TextField
                name="empid"
                label="Employee ID"
                placeholder="Enter Employee ID"
              />
              <TextField
                name="firstname"
                label="First Name"
                placeholder="Enter First Name"
              />
              <TextField
                name="lastname"
                label="Last Name"
                placeholder="Enter Last name"
              />
              <TextField name="email" label="Email" placeholder="Enter Email" />
              <TextField
                name="phone"
                label="Phone"
                placeholder="Enter Phone Number"
              />
              <TextField
                name="designation"
                label="Designation"
                placeholder="Enter Designation"
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div className="buttonclose" style={{ width: "40%" }}>
                <input type="submit" value="Cancel" onClick={handleClose} />
              </div>
              <div className="button" style={{ width: "40%" }}>
                <input type="submit" value="Edit" disabled={isSubmitted}/>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
