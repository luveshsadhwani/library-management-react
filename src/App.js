import React, {useState, useEffect} from "react";
import './App.css';
import Login from "./components/login/Login"
import About from "./components/about/About"
import Sidebar from "./components/sidebar/Sidebar"
import NotFound from "./components/NotFound/notfound"
import authentication from "./components/auth/auth"
import axios from "axios";
//Router
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

// So the plan is to Set a use State here
// We pass use State where we want to prevent direct acess



function App() {
//  let auth_check = false
  // Passing USER DETAILS into profile component
  let [uinfo, setUname] = useState('')
  const empId = localStorage.getItem("emPID");
  let pls_push = false
  const funclogin = details=>{
    console.log(details)
    authentication.onAuthentication()
    setUname({name:details, auth:true})
    localStorage.setItem('auth', true)

    localStorage.setItem("user", uinfo.name);

  }
  if(uinfo.auth===true){
    localStorage.setItem('auth', true);
    localStorage.setItem("user", uinfo.name)
  }
  const api_request_to_check = async () =>{
    let trimmed_empid
    try {
      trimmed_empid = empId.replace("#", "%23")
    } catch (error) {
      console.log(error)
    }
    await axios.get(`http://localhost:8000/deleted_account?employee_id=${trimmed_empid}`)
    .then(
      res=>{
        if(res.data==false){
          localStorage.clear()
          pls_push = true
        }else{
          pls_push = false
        }
      }
    )
  }

  useEffect(()=>{
    api_request_to_check()
  },[])



  // have a useEfect to check for account deletion

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact render={()=><Login log_details={funclogin}/>}/>
          <Route path="/about" exact component={About}/>
          <Route path="/home" render={()=><Sidebar auth_check={localStorage.getItem('auth')} user={localStorage.getItem('user')} pleasepush={pls_push}/>}/>
          <Route component={NotFound}/>
          </Switch>  
      </div>
    </Router>
  );
}

export default App;

//render={()=><About islogin_check={islogin}/>
