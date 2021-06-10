import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import Home from "../../container/Home";
import Profile from "../../container/Profile";
import Dashboard from "../../container/Dashboard";
import Issues from "../../container/Issues";
import Location from "../../container/Location";
import AddEntryFormik from "../../container/functionalitycomp/AddEntryFormik"
import EditBookFormik from "../Forms/EditBookFormik";
import View from "../View/View";
import IssueFormFormik from "../Forms/IssueFormFormik";

export default function AppNavigator() {
  let match = useRouteMatch().url;

  return (
    <Switch>
      <Route path={`${match}`} component={Home} exact />
      <Route path={`${match}/profile`} component={Profile} exact />
      <Route path={`${match}/dashboard`} component={Dashboard} exact />
      <Route path={`${match}/events`} component={Issues} exact />
      <Route path={`${match}/location`} component={Location} exact />
      <Route path={`${match}/add`} component={AddEntryFormik} exact />
      <Route path={`${match}/edit/:id`} component={EditBookFormik} exact />
      <Route path={`${match}/view/:isbn`} component={View} exact />
      <Route path={`${match}/issue/:id`} component={IssueFormFormik} exact />
    </Switch>
  );
}
