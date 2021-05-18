import React from "react";
import {  Redirect, Route, Switch, useHistory } from "react-router-dom";
import { Carteras } from "../components/carteras/Carteras";
import Depositos from "../components/depositos/Depositos";
import { Retiros } from '../components/retiros/Retiros';
import { getUser } from "../utils/helper";

export const DashboardRoutes = () => {
    const history = useHistory();
    if(getUser() === null){
      history.replace('/login');
    }

  return (
    <>
        <Switch>
          <Route path="/retiro/:id" component={Retiros} />
          <Route path="/deposito/:id" component={Depositos} />
          <Route path="/" component={Carteras} />
          <Redirect to="/"/>
          
        </Switch>
    </>
  );
};
