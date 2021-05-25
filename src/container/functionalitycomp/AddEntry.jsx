import React, {useState}  from 'react'
import "./addentry.css"
import { createStandaloneToast} from "@chakra-ui/react"

// This is where we have out input form 

export default function AddEntry() {

    const toast =  createStandaloneToast()
    const [bookname, setBookname] = useState("")
    const [author, setAuthor] = useState("")
    const [snumber, setSnumber] = useState("")
    const [cond, setCond] = useState("")
    const [isud, setIsud] = useState("")


    const submit_entry = (e)=>{
        e.preventDefault()

        //// CONNECTION TO THE CUSTOM API GOES HERE USE AXIOS TO SENT POST REQ


        setBookname('')
        setAuthor('')
        setCond('')
        setSnumber('')
        setIsud('')

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
                                    <span className="details">Serial Number</span>
                                    <input value={snumber} placeholder="Enter Serial Number" onChange={(e)=>{setSnumber(e.target.value)}}  required/>
                                </div>
                                <div className="entry-box">
                                    <span className="details">Condition</span>
                                    <input value={cond} placeholder="Enter Condition" onChange={(e)=>{setCond(e.target.value)}}  required/>
                                </div>
                                <div className="entry-box">
                                    <span className="details">Issued</span>
                                    <input value={isud} placeholder="Enter issue status" onChange={(e)=>{setIsud(e.target.value)}}  required/>
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
