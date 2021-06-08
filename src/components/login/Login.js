import React, {useState, useEffect} from 'react'
import './Login.css'
import logo from "./assets/old-man-taking-book-from-shelf.png";
import { useHistory } from 'react-router-dom';
import { createStandaloneToast} from "@chakra-ui/react"
import axios from "axios";
//import authentication from "../auth/auth"


function Login({log_details}) {

  const toast =  createStandaloneToast()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
//  const [details_to_pass, setDetails_To_Pass] = useState({name:''})
  let history = useHistory();

  useEffect(()=>{
    let lcl_check = localStorage.getItem('auth');
    if(lcl_check){
      history.push("/home")
    }else{
      return    
    }
  },[])

  const check_for_login = async (username, password) => {
    await axios
    .get(`http://localhost:8000/login`,{
      params: {
        username: username,
        password: password
      },
    })
    .then(result => {
      console.log(result.data)
      if(!result.data){
        toast({
          title: "An error occurred trying to login.",
          description: "Unable to verify Account.",
          status: "error",
          variant: "solid",
          duration: 1200,
          position: "top-left",
          isClosable: false,
        })
        setUsername('')
        setPassword('')
      }
      else{
        localStorage.setItem('emPID', result.data.empid);
        localStorage.setItem('user', result.data.username)
        console.log(localStorage.getItem('emPID'))
        log_details(username);
        history.push("/home")
      }

    })
    .catch(err=>{
      toast({
        title: "An error occurred trying to login.",
        description: `Error from API status: ${err}`,
        status: "error",
        variant: "solid",
        duration: 1200,
        position: "top-left",
        isClosable: false,
      })
    })
  };


  const submit = (e)=>{
    e.preventDefault()
    check_for_login(username, password)

  }


    return (
        
        <div className="login-form">
          <h1>Institute Name</h1>
          <div className="container">
            <div className="main">
              <div className="content">
                <h2>Login</h2>
                <form onSubmit={submit}>
                  <input type="email" value={username} placeholder="User Name" onChange={(e)=>{setUsername(e.target.value)}} required />
                  <input type="password" value={password} placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} required />
                  <button className="btn" type="submit" >Login</button>
                </form>
                <p className="account">Don't have an account? <br/>contact your sys admin</p>
              </div>
              <div className='form-img'>
                <img src={logo} alt="stock_"/>
              </div>
            </div>
          </div>
        </div>  
    )
}

export default Login
