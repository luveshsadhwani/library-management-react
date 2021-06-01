import React, {useState, useEffect}  from 'react'
import { createStandaloneToast} from "@chakra-ui/react"
import axios from "axios"
import {useParams} from "react-router-dom"

// This is where we have out input form 



export default function Edit() {

    const toast =  createStandaloneToast()
    const [bookname, setBookname] = useState("")
    const [author, setAuthor] = useState("")
    const [isbnnumber, setIsbnumber] = useState("")
    const [publisher, setPublisher] = useState("")
    const [subject, setSubject] = useState("")
    const {id} = useParams()

    console.log(id)
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
        
        // UPDATE WHERE ID
        await axios.post(`http://localhost:8000/updateentry`,null, {params:{
            index:id,
            authorname:author,
            booktitle:bookname,
            subject:subject,
            publisher:publisher,
            isbn:isbnnumber
        }})
        .then(()=>{
            toast({
                title: "Successfully verified data",
                description: "Create an api and bind with submit btn",
                status: "success",
                variant: "solid",
                duration: 1500,
                position: "top-right",
                isClosable: false,
              })
        })  
        .catch(err=>{
            toast({
                title: "Error Pushing Data",
                description: `Error: ${err}`,
                status: "error",
                variant: "solid",
                duration: 1500,
                position: "top-right",
                isClosable: false,
              })
        })

      }

    const retrieve =async()=>{
        // FETCH WHERE ID IS SOMETHING
        await axios.get(`http://localhost:8000/find`, {params:{
            entry_id: id
        }})
        .then(response=>{
            setBookname(response.data.booktitle)
            setAuthor(response.data.authorname)
            setIsbnumber(response.data.Isbn)
            setPublisher(response.data.Publisher)
            setSubject(response.data.Subject)
        })
        .catch(err=>{
            toast({
                title: "Error Getting Data",
                description: `Error: ${err}`,
                status: "error",
                variant: "solid",
                duration: 1500,
                position: "top-right",
                isClosable: false,
              })
        })
    }
    
    useEffect(()=>{
        retrieve()
    },[])

    return(
        <div>
            <div className="entry">
                <div className="entrycontainer">
                    <div className="title">
                        Edit Entry Details</div>
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
