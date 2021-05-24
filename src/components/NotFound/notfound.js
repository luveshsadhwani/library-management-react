import React from 'react'
import {NavLink} from "react-router-dom"
import './notfound.css'

function NotFound() {
    return (
        <div className="randcol">
            <div id="container">
                <div className="error_page">
                    <h2>404</h2>
                    <h4>Opps! Page not found!</h4>
                    <p>The page you are looking for doesn't exist. You may have mistyped
                        the address or the page may have moved.
                    </p>
                    <NavLink exact to="/home"><i>Return to Home</i></NavLink>

                </div>
            </div>
        </div>
    )
}

export default NotFound

