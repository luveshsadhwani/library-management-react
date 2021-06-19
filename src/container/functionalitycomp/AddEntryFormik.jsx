import React, { useState } from "react";
import axios from "axios";
import "./addentry.css";
import { createStandaloneToast } from "@chakra-ui/react";
import { Formik, Form, Field, useField, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router";

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

// check if staff have a specific email, we can use regex to match this
//check phone number format
function AddPresentational(props) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  // Formik keeps tracks of form values, so we won't have useState here, take in the state from the parent. These will map out the keys and values for each textfield we have through the name prop
  const { bookInfo } = props;
  const history = useHistory();
  // Yup can validate for different types of data. Here we validate a string that matches a regex so that we don't get numbers. I've written it separately to make it neater. I allowed numbers for the booktitle, but not author, publisher or subject
  const textValidation = Yup.string().matches(
    /^[a-zA-Z. ]+$/,
    "No numbers allowed"
  );

  // This is our validation schema, we can assign different validation types for each field. For ISBN, we are accepting hyphens too
  const validate = Yup.object({
    authorname: textValidation.required("Required"),
    booktitle: Yup.string().required("Required"),
    Isbn: Yup.string()
      .matches(
        /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/,
        "ISBN must be 10 or 13 digits"
      )
      .required("Required"),
    Publisher: textValidation.required("Required"),
    Subject: textValidation.required("Required"),
  });

  const submit_entry = async (values, actions) => {
    setTimeout(actions.resetForm, 1000);
    const toast = createStandaloneToast();
    //// CONNECTION TO THE CUSTOM API GOES HERE USE AXIOS TO SENT POST REQ
    let params = {
      booktitle: values.booktitle,
      authorname: values.authorname,
      publisher: values.Publisher,
      subject: values.Subject,
      isbn: values.Isbn,
      issued_data: "",
    };

    setIsSubmitted(true);

    // UPDATE WHERE ID
    await axios
      .post(`http://localhost:8000/entry`, null, {
        params: params,
      })
      .then(() => {
        toast({
          title: `Successfully added ${values.booktitle}`,
          description: `Author: ${values.authorname}, ISBN: ${values.Isbn}`,
          status: "success",
          variant: "solid",
          duration: 2000,
          position: "top-right",
          isClosable: false,
        });
        setInterval(() => {
          history.go(0);
        }, 2000);
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

  // Formik automatically tracks our input values and manages the onChange and onSubmit props
  return (
    <div className="entry">
      <div className="entrycontainer">
        <div className="title">Add Entry Details</div>
        <Formik
          initialValues={bookInfo}
          onSubmit={submit_entry}
          validationSchema={validate}
        >
          <Form>
            <div className="entry-details">
              <TextField
                name="booktitle"
                label="Book Title"
                placeholder="Enter Book Title"
              />
              <TextField
                name="authorname"
                label="Author"
                placeholder="Enter Author"
              />
              <TextField name="Isbn" label="ISBN" placeholder="Enter ISBN" />
              <TextField
                name="Publisher"
                label="Publisher"
                placeholder="Enter Publisher"
              />
              <TextField
                name="Subject"
                label="Subject"
                placeholder="Enter Subject"
              />
            </div>
            <div className="button">
              <input type="submit" value="Add Entry" disabled={isSubmitted}/>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default function AddBookFormik() {
  // I've run our get request separately here so the actual form will only be in charge of displaying and submitting ata

  const defaultBookInfoState = {
    id: "",
    authorname: "",
    booktitle: "",
    Subject: "",
    Publisher: "",
    Isbn: "",
    issued: "",
  };

  return <AddPresentational bookInfo={defaultBookInfoState} />;
}
