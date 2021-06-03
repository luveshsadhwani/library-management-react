import React, { useState, useEffect } from "react";
import { createStandaloneToast } from "@chakra-ui/react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import "./form.css";

// This is where we have out input form

export default function IssueForm() {
  const toast = createStandaloneToast();
  const [bookname, setBookname] = useState("");
  const [author, setAuthor] = useState("");
  const [isbnnumber, setIsbnumber] = useState("");
  const [publisher, setPublisher] = useState("");
  const [subject, setSubject] = useState("");
  const [studentId, setStudentId] = useState("#XXXXXXXX");
  const { id } = useParams();

  let history = useHistory();

  const submit_issue = async (e) => {
    e.preventDefault();

    //// CONNECTION TO THE CUSTOM API GOES HERE USE AXIOS TO SENT POST REQ
    let datatosend = {
      studentId,
    };

    console.log(datatosend);

    // UPDATE WHERE ID
    await axios.post(`http://localhost:8000/updateissued`, null, { params: {
      entry_id:id,
      data_to_push:studentId

      }})
      .then(() => {
        toast({
          title: "Successfully Issued",
          description: `Successfully Issued book to ${studentId}`,
          status: "success",
          variant: "solid",
          duration: 1500,
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
          duration: 1500,
          position: "top-right",
          isClosable: false,
        });
      })
      .finally(history.push("/home/dashboard"));
  };

  useEffect(() => {
    async function retrieve() {
      await axios
        .get(`http://localhost:8000/find`, {params:{
            entry_id: id
        }})
        .then((response) => {
          setBookname(response.data.booktitle);
          setAuthor(response.data.authorname);
          setIsbnumber(response.data.Isbn);
          setPublisher(response.data.Publisher);
          setSubject(response.data.Subject);
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
  }, [id, toast]);

  return (
    <div>
      <div className="entry">
        <div className="entrycontainer">
          <div className="title">Issue Book</div>
          <form onSubmit={submit_issue}>
            <div className="entry-details">
              <div className="entry-box">
                <span className="details">Book Name</span>
                <input value={bookname} disabled />
              </div>
              <div className="entry-box">
                <span className="details">Author</span>
                <input value={author} disabled />
              </div>
              <div className="entry-box">
                <span className="details">Isbn Number</span>
                <input value={isbnnumber} disabled />
              </div>
              <div className="entry-box">
                <span className="details">Publisher</span>
                <input value={publisher} disabled />
              </div>
              <div className="entry-box">
                <span className="details">Subject</span>
                <input value={subject} disabled />
              </div>
              <div className="entry-box">
                <span className="details">Student ID</span>
                <input
                  value={studentId}
                  onChange={(e) => {
                    setStudentId(e.target.value);
                  }}
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
