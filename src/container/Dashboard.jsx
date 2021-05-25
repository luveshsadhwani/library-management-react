import React, {useState, useEffect} from 'react'
import axios from "axios"
import {Link} from "react-router-dom"
import "./customcss/dashboard.css"

export default function Dashboard() {
    const [users, setUsers] = useState([])

    useEffect(()=>{
        loaddata()
    },[])

    const loaddata = async()=>{
        const resultdata = await axios.get("http://localhost:8000/users")
        setUsers(resultdata.data)
    }

    console.log(users)

    return(
        <div className="py-4 mr2 ml2">
            <div>
                <h1 className="center">Welcome to Dashboard</h1>
            </div>
            <table className="table table-light table-striped border shadow mt20">
                <thead className="table table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index)=>(
                            <tr>
                                <th scope="row">{index+1}</th>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link className="btn btn-primary mr2" to="/home/dashboard">View</Link>
                                    <Link className="btn btn-outline-primary mr2" to={`/home/edit/${index+1}`}>Edit</Link>
                                    <Link className="btn btn-danger mr2" to="/home/dashboard">Delete</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>  
    )
}
