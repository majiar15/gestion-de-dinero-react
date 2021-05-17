import React from "react";
import {  Redirect, Route, Switch, useHistory } from "react-router-dom";
import { Carteras } from "../components/carteras/Carteras";
import { getUser } from "../utils/helper";

export const DashboardRoutes = () => {
    const history = useHistory();
    if(getUser() === null){
      history.replace('/login');
    }

  return (
    <>
     
     <div className="container">
        <Switch>
          <Route exact path="/" component={Carteras} />

          <Redirect to="/" />
        </Switch>
      </div>
    </>
  );
};
