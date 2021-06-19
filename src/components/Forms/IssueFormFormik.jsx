import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { createStandaloneToast } from "@chakra-ui/react";
import { Formik, Form, Field, useField, ErrorMessage } from "formik";
import * as Yup from "yup";

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
function IssuePresentational(props) {
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
    issued: Yup.string()
      .matches(/^#\d{4}$/, "Enter # followed by the 4 digit ID")
      .required("Required"),
    issued_date: Yup.string()
      .matches(
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
        "Date Must Be in Format dd/mm/yy"
      )
      .required("Required"),
    return_date: Yup.string()
      .matches(
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
        "Date Must Be in Format dd/mm/yy"
      )
      .required("Required"),
  });

  const submit_entry = async (values) => {
    const toast = createStandaloneToast();

    //// CONNECTION TO THE CUSTOM API GOES HERE USE AXIOS TO SENT POST REQ
    let params = values.issued;
    let date_ofreturn = values.return_date;
    let date_ofissue = values.issued_date;

    setIsSubmitted(true);

    // UPDATE WHERE ID
    await axios
      .post(`http://localhost:8000/updateissued`, null, {
        params: {
          entry_id: values.id,
          data_to_push: params,
          date_of_issue: date_ofissue,
          return_date: date_ofreturn,
        },
      })
      .then(() => {
        toast({
          title: `Successfully Issued`,
          description: `Successfully Issued ${values.booktitle} by ${values.authorname} to ${params}`,
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
        setIsSubmitted(false);
      });
  };

  // Formik automatically tracks our input values and manages the onChange and onSubmit props
  return (
    <div className="entry">
      <div className="entrycontainer">
        <div className="title">Issue Book</div>
        <Formik
          initialValues={bookInfo}
          onSubmit={submit_entry}
          validationSchema={validate}
          enableReinitialize={true}
        >
          <Form>
            <div className="entry-details">
              <TextField
                name="booktitle"
                label="Book Title"
                placeholder="Enter Book Title"
                disabled
              />
              <TextField
                name="authorname"
                label="Author"
                placeholder="Enter Author"
                disabled
              />
              <TextField
                name="Isbn"
                label="ISBN"
                placeholder="Enter ISBN"
                disabled
              />
              <TextField
                name="Publisher"
                label="Publisher"
                placeholder="Enter Publisher"
                disabled
              />
              <TextField
                name="Subject"
                label="Subject"
                placeholder="Enter Subject"
                disabled
              />
              <TextField
                name="issued"
                label="Issued"
                placeholder="Enter Student ID"
              />
              <TextField
                name="issued_date"
                label="Date of Issue"
                placeholder="dd/mm/yy"
              />
              <TextField
                name="return_date"
                label="Date of Return"
                placeholder="dd/mm/yy"
              />
            </div>
            <div className="button">
              <input type="submit" value="IssueBook" disabled={isSubmitted} />
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default function IssueBookFormik() {
  // I've run our get request separately here so the actual form will only be in charge of displaying and submitting ata

  const { id } = useParams();
  const defaultBookInfoState = {
    id: id,
    authorname: "",
    booktitle: "",
    Subject: "",
    Publisher: "",
    Isbn: "",
    issued: "",
    issued_date: "",
    return_date: "",
  };
  const [bookInfo, setBookInfo] = useState(defaultBookInfoState);
  console.log(bookInfo);

  useEffect(() => {
    const toast = createStandaloneToast();
    const retrieve = async () => {
      // FETCH WHERE ID IS SOMETHING
      await axios
        .get(`http://localhost:8000/find`, {
          params: {
            entry_id: id,
          },
        })
        // .get(`http://localhost:8000/books/${id}`)
        .then((response) => {
          setBookInfo(response.data);
        })
        .catch((err) => {
          toast({
            title: "Error Getting Data",
            description: `Error: ${err}`,
            status: "error",
            variant: "solid",
            duration: 1500,
            position: "top-right",
            isClosable: false,
          });
        });
    };

    retrieve();
  }, [id]);

  return <IssuePresentational bookInfo={bookInfo} />;
}
