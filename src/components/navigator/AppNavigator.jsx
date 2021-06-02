import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Home from '../../container/Home'
import Profile from '../../container/Profile'
import Dashboard from '../../container/Dashboard'
import Issues from '../../container/Issues'
import Location from '../../container/Location'
import AddEntry from '../../container/functionalitycomp/AddEntry'
import Edit from "../Edit/Edit"
import View from "../View/View"

export default function AppNavigator() {
    let match = useRouteMatch().url;
    
    return (
        <Switch>
            <Route path={`${match}`} component={Home} exact/>
            <Route path={`${match}/profile`} component={Profile} exact/>
            <Route path={`${match}/dashboard`} component={Dashboard} exact/>
            <Route path={`${match}/events`} component={Issues} exact/>
            <Route path={`${match}/location`} component={Location} exact/>
            <Route path={`${match}/add`} component={AddEntry} exact/>
            <Route path={`${match}/edit/:id`} component={Edit} exact/>
            <Route path={`${match}/view/:isbn`} component={View} exact/>
        </Switch>
    )
}
