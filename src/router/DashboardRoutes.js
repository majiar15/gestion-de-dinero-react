import React from "react";
import {  Redirect, Route, Switch, useHistory } from "react-router-dom";
import { Carteras } from "../components/carteras/Carteras";
import Depositos from "../components/depositos/Depositos";
import { Historial } from "../components/historial/Historial";
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
          <Route exact path="/retiro/:id" component={Retiros} />
          <Route exact path="/deposito/:id" component={Depositos} />
          <Route exact path="/historial/:id" component={Historial} />
          <Route path="/" component={Carteras} />
          <Redirect to="/"/>
          
        </Switch>
    </>
  );
};
