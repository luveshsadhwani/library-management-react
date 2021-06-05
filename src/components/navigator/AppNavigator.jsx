import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Home from "../../container/Home";
import Profile from "../../container/Profile";
import Dashboard from "../../container/Dashboard";
import Issues from "../../container/Issues";
import Location from "../../container/Location";
import Settings from "../../container/Settings";
import AddEntry from "../../container/functionalitycomp/AddEntry";
import Edit from "../Forms/Edit";
import View from "../View/View";
import IssueForm from "../Forms/IssueForm";
import AddUser from "../Forms/AddUser";

export default function AppNavigator() {
  let match = useRouteMatch().url;

  return (
    <Switch>
      <Route path={`${match}`} component={Home} exact />
      <Route path={`${match}/profile`} component={Profile} exact />
      <Route path={`${match}/dashboard`} component={Dashboard} exact />
      <Route path={`${match}/events`} component={Issues} exact />
      <Route path={`${match}/location`} component={Location} exact />
      <Route path={`${match}/add`} component={AddEntry} exact />
      <Route path={`${match}/settings`} component={Settings} exact />
      <Route path={`${match}/edit/:id`} component={Edit} exact />
      <Route path={`${match}/view/:isbn`} component={View} exact />
      <Route path={`${match}/issue/:id`} component={IssueForm} exact />
      <Route path={`${match}/adduser`} component={AddUser} exact />
    </Switch>
  );
}
