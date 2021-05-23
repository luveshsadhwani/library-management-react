import authentication from "./auth"
import {Route, Redirect  } from 'react-router-dom'

function SecuredRoute(props){
    return(
        <Route path={props.path} render={data=>authentication.getLoginStatus()?(
            <props.component {...data}></props.component>):
            (<Redirect to={{pathname:"/"}}></Redirect>)}></Route>
        )
}

export default SecuredRoute