import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "../componets/login/Login";


import { DashboardRoutes } from "./DashboardRoutes";

export const AppRouter = () => {
  return (
    <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/" component={DashboardRoutes} />
     
        </Switch>

    </Router>
  );
};
