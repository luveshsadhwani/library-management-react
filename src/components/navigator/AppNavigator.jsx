import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Home from '../../container/Home'
import Profile from '../../container/Profile'
import Dashboard from '../../container/Dashboard'
import Events from '../../container/Events'
import Location from '../../container/Location'
import AddEntry from '../../container/functionalitycomp/AddEntry'

export default function AppNavigator() {
    // let match = useRouteMatch().url;
    
    return (
        <Switch>
            <Route path="/home" component={Home} exact/>
            <Route path="/profile" component={Profile} exact/>
            <Route path="/dashboard" component={Dashboard} exact/>
            <Route path="/events" component={Events} exact/>
            <Route path="/location" component={Location} exact/>
            <Route path="/add" component={AddEntry} exact/>
            <Route path="/edit/:id" exact/>
            <Route path="/view/:id" exact/>
            <Route path="/delete/:id" exact/>
        </Switch>
    )
}
