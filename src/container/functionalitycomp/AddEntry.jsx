import React, { useState } from "react";
import "./addentry.css";
import { createStandaloneToast } from "@chakra-ui/react";
import axios from "axios";

// This is where we have out input form

export default function AddEntry() {
  const defaultBookInfoState = {
    id: -1,
    authorname: "",
    booktitle: "",
    Subject: "",
    Publisher: "",
    Isbn: "",
    issued: "",
  };

  const [bookInfo, setBookInfo] = useState(defaultBookInfoState);
  const toast = createStandaloneToast();

  const handleChange = (e) => {
    const value = e.target.value;
    setBookInfo((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const submit_entry = async (e) => {
    e.preventDefault();

    //// CONNECTION TO THE CUSTOM API GOES HERE USE AXIOS TO SENT POST REQ
    let params = {
      authorname: bookInfo.authorname,
      booktitle: bookInfo.booktitle,
      subject: bookInfo.Subject,
      publisher: bookInfo.Publisher,
      isbn: bookInfo.Isbn,
      issued_data: "",
    };

    setBookInfo(defaultBookInfoState);
    // ACCESS THE CUSTOM API HERE AND SEND THE DATA
    await axios
      .post(`http://localhost:8000/entry`, null, {
        params: params,
      })
      .then(
        toast({
          title: `Successfully Added ${params.booktitle}`,
          description: `Author: ${params.authorname}, ISBN: ${params.isbn}, Subject: ${params.subject}, Publisher: ${params.publisher}`,
          status: "success",
          variant: "solid",
          duration: 3000,
          position: "top-right",
          isClosable: false,
        })
      )
      .catch((err) =>
        toast({
          title: "Successfully verified data",
          description: `Could not push data into our Database Error: ${err}`,
          status: "error",
          variant: "solid",
          duration: 1500,
          position: "top-right",
          isClosable: false,
        })
      );
  };

  return (
    <div>
      <div className="entry">
        <div className="entrycontainer">
          <div className="title">Add Entry Details</div>
          <form onSubmit={submit_entry}>
            <div className="entry-details">
              <div className="entry-box">
                <span className="details">Book Name</span>
                <input
                  name={Object.keys(defaultBookInfoState)[2]}
                  value={bookInfo.booktitle}
                  placeholder="Enter Book Name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="entry-box">
                <span className="details">Author</span>
                <input
                  name={Object.keys(defaultBookInfoState)[1]}
                  value={bookInfo.authorname}
                  placeholder="Enter Author Name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="entry-box">
                <span className="details">Isbn Number</span>
                <input
                  name={Object.keys(defaultBookInfoState)[5]}
                  value={bookInfo.Isbn}
                  placeholder="Enter Isbn Number"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="entry-box">
                <span className="details">Publisher</span>
                <input
                  name={Object.keys(defaultBookInfoState)[4]}
                  value={bookInfo.Publisher}
                  placeholder="Enter Publisher"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="entry-box">
                <span className="details">Subject</span>
                <input
                  name={Object.keys(defaultBookInfoState)[3]}
                  value={bookInfo.Subject}
                  placeholder="Enter Publisher"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="button">
              <input type="submit" value="Add Entry" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
