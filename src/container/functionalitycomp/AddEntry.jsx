import React, {useState}  from 'react'
import "./addentry.css"
import { createStandaloneToast} from "@chakra-ui/react"
import axios from "axios"

// This is where we have out input form 



export default function AddEntry() {

    const toast =  createStandaloneToast()
    const [bookname, setBookname] = useState("")
    const [author, setAuthor] = useState("")
    const [isbnnumber, setIsbnumber] = useState("")
    const [publisher, setPublisher] = useState("")
    const [subject, setSubject] = useState("")


    const submit_entry = async (e)=>{
        e.preventDefault()

        //// CONNECTION TO THE CUSTOM API GOES HERE USE AXIOS TO SENT POST REQ
        let datatosend={
            "authorname":author,
            "booktitle":bookname,
            "Subject":subject,
            "Publisher":publisher,
            "Isbn":isbnnumber
        }

        console.log(datatosend)

        setBookname('')
        setAuthor('')
        setIsbnumber('')
        setPublisher('')
        setSubject('')
        
        await axios.post('http://localhost:8000/books', datatosend)

        toast({
            title: "Successfully verified data",
            description: "Create an api and bind with submit btn",
            status: "success",
            variant: "solid",
            duration: 1500,
            position: "top-right",
            isClosable: false,
          })
      }

    return(
        <div>
            <div className="entry">
                <div className="entrycontainer">
                    <div className="title">
                        Add Entry Details</div>
                        <form onSubmit={submit_entry}>
                            <div className="entry-details">
                                <div className="entry-box">
                                    <span className="details">Book Name</span>
                                    <input value={bookname} placeholder="Enter Book Name" onChange={(e)=>{setBookname(e.target.value)}}  required/>
                                </div>
                                <div className="entry-box">
                                    <span className="details">Author</span>
                                    <input value={author} placeholder="Enter Author Name" onChange={(e)=>{setAuthor(e.target.value)}}  required/>
                                </div>
                                <div className="entry-box">
                                    <span className="details">Isbn Number</span>
                                    <input value={isbnnumber} placeholder="Enter Isbn Number" onChange={(e)=>{setIsbnumber(e.target.value)}}  required/>
                                </div>
                                <div className="entry-box">
                                    <span className="details">Publisher</span>
                                    <input value={publisher} placeholder="Enter Publisher" onChange={(e)=>{setPublisher(e.target.value)}}  required/>
                                </div>
                                <div className="entry-box">
                                    <span className="details">Subject</span>
                                    <input value={subject} placeholder="Enter Publisher" onChange={(e)=>{setSubject(e.target.value)}}  required/>
                                </div>
                            </div>
                            <div className="button">
                                <input type="submit" value="Add Entry"/>
                            </div>
                        </form>

                </div>
            </div>
        </div>
    )

}
