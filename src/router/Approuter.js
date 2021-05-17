import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "../components/login/Login";
import { Register } from "../components/register/register";


import { DashboardRoutes } from "./DashboardRoutes";

export const AppRouter = () => {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={DashboardRoutes} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
     
        </Switch>

    </Router>
  );
};
