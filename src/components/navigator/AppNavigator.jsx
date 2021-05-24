import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Home from '../../container/Home'
import Profile from '../../container/Profile'
import Dashboard from '../../container/Dashboard'
import Events from '../../container/Events'
import Location from '../../container/Location'
import AddEntry from '../../container/AddEntry'

export default function AppNavigator() {
    let match = useRouteMatch().url;
    console.log(match);
    
    return (
        <Switch>
            <Route path={`${match}`} component={Home} exact/>
            <Route path={`${match}/profile`} component={Profile} exact/>
            <Route path={`${match}/dashboard`} component={Dashboard} exact/>
            <Route path={`${match}/events`} component={Events} exact/>
            <Route path={`${match}/location`} component={Location} exact/>
            <Route path={`${match}/add`} component={AddEntry} exact/>
        </Switch>
    )
}
