import React, {useState, useEffect} from 'react'
import './Login.css'
import logo from "./assets/old-man-taking-book-from-shelf.png";
import { useHistory } from 'react-router-dom';
import { createStandaloneToast} from "@chakra-ui/react"
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

  const submit = (e)=>{
    e.preventDefault()

    // DO ALL THE AUTHENTICATION RIGHT HERE
    if (username==="root" && password==="root"){
//        authentication.onAuthentication()
        log_details(username);
        history.push("/home")
    }else{
      setPassword("")
      setUsername("")
    }

  }

  const check_m=(e)=>{
    if(username!=="root" || password!=="root"){
    toast({
      title: "An error occurred trying to login.",
      description: "Unable to verify Account.",
      status: "error",
      variant: "solid",
      duration: 1200,
      position: "top-left",
      isClosable: false,
    })
  }
  }  
    return (
        
        <div className="login-form">
          <h1>Institute Name</h1>
          <div className="container">
            <div className="main">
              <div className="content">
                <h2>Login</h2>
                <form onSubmit={submit}>
                  <input type="text" value={username} placeholder="User Name" onChange={(e)=>{setUsername(e.target.value)}} required />
                  <input type="password" value={password} placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} required />
                  <button className="btn" type="submit" onClick={check_m}>Login</button>
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
