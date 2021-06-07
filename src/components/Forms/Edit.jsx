import React, { useState, useEffect } from "react";
import { createStandaloneToast } from "@chakra-ui/react";
import axios from "axios";
import { useParams } from "react-router-dom";

// This is where we have out input form

export default function Edit() {
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
  const { id } = useParams();

  const handleChange = (e) => {
    const value = e.target.value;
    setBookInfo((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  //   console.log(id);
  const submit_entry = async (e) => {
    e.preventDefault();

    //// CONNECTION TO THE CUSTOM API GOES HERE USE AXIOS TO SENT POST REQ
    let params = {
      id: id,
      booktitle: bookInfo.booktitle,
      authorname: bookInfo.authorname,
      publisher: bookInfo.Publisher,
      subject: bookInfo.Subject,
      isbn: bookInfo.Isbn,
    };
    console.log(params);

    // UPDATE WHERE ID
    await axios
      .post(`http://localhost:8000/updateentry`, null, {
        params: params,
      })
      .then(() => {
        toast({
          title: `Successfully editted ${bookInfo.booktitle}`,
          description: `Author: ${bookInfo.authorname}, ISBN: ${bookInfo.Isbn}`,
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
          duration: 3000,
          position: "top-right",
          isClosable: false,
        });
      });
  };

  useEffect(() => {
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

  return (
    <div>
      <div className="entry">
        <div className="entrycontainer">
          <div className="title">Edit Book Details</div>
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
              <input type="submit" value="Edit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
