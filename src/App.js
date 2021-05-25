import React, {useState} from "react";
import './App.css';
import Login from "./components/login/Login"
import About from "./components/about/About"
import Sidebar from "./components/sidebar/Sidebar"
import NotFound from "./components/NotFound/notfound"
import authentication from "./components/auth/auth"



//Router
import {BrowserRouter as Router, Switch, Route  } from 'react-router-dom'

// So the plan is to Set a use State here
// We pass use State where we want to prevent direct acess



function App() {
//  let auth_check = false
  // Passing USER DETAILS into profile component
  let [uinfo, setUname] = useState('')
  

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



  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact render={()=><Login log_details={funclogin}/>}/>
          <Route path="/about" exact component={About}/>
          <Route path="/home" render={()=><Sidebar auth_check={localStorage.getItem('auth')} user={localStorage.getItem('user')}/>}/>
          <Route component={NotFound}/>
          </Switch>  
      </div>
    </Router>
  );
}

export default App;

//render={()=><About islogin_check={islogin}/>
