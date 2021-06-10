import React, { useState, useEffect } from "react";
import { createStandaloneToast } from "@chakra-ui/react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import "./form.css";

// This is where we have out input form

export default function IssueForm() {
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
  
  const { id } = useParams();

  let history = useHistory();

  const handleChange = (e) => {
    const value = e.target.value;
    setBookInfo((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const submit_issue = async (e) => {
    e.preventDefault();
    const toast = createStandaloneToast();
    //// CONNECTION TO THE CUSTOM API GOES HERE USE AXIOS TO SENT POST REQ
    let params = bookInfo.issued;

    // UPDATE WHERE ID
    await axios
      .post(`http://localhost:8000/updateissued`, null, {
        params: {
          entry_id: id,
          data_to_push: params,
        },
      })
      .then(() => {
        toast({
          title: "Successfully Issued",
          description: `Successfully Issued book to ${params}`,
          status: "success",
          variant: "solid",
          duration: 1500,
          position: "top-right",
          isClosable: false,
        });
        history.push("/home/dashboard");
      })
      .catch((err) => {
        toast({
          title: "Error Issuing Book",
          description: `Error: ${err}`,
          status: "error",
          variant: "solid",
          duration: 1500,
          position: "top-right",
          isClosable: false,
        });
      });
  };

  useEffect(() => {
    const toast = createStandaloneToast();
    async function retrieve() {
      await axios
        .get(`http://localhost:8000/find`, {
          params: {
            entry_id: id,
          },
        })
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
    }

    retrieve();
  }, [id]);

  return (
    <div>
      <div className="entry">
        <div className="entrycontainer">
          <div className="title">Issue Book</div>
          <form onSubmit={submit_issue}>
            <div className="entry-details">
              <div className="entry-box">
                <span className="details">Book Name</span>
                <input value={bookInfo.booktitle} disabled />
              </div>
              <div className="entry-box">
                <span className="details">Author</span>
                <input value={bookInfo.authorname} disabled />
              </div>
              <div className="entry-box">
                <span className="details">Isbn Number</span>
                <input value={bookInfo.authorname} disabled />
              </div>
              <div className="entry-box">
                <span className="details">Publisher</span>
                <input value={bookInfo.Publisher} disabled />
              </div>
              <div className="entry-box">
                <span className="details">Subject</span>
                <input value={bookInfo.Subject} disabled />
              </div>
              <div className="entry-box">
                <span className="details">Student ID</span>
                <input
                  name={Object.keys(defaultBookInfoState)[6]}
                  value={bookInfo.issued}
                  placeholder="#XXXXXXXX"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="button">
              <input type="submit" value="Issue Book" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
