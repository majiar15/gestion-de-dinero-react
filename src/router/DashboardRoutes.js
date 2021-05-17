import React from "react";
import {  Redirect, Route, Switch } from "react-router-dom";
import { Carteras } from "../components/carteras/Carteras";

export const DashboardRoutes = () => {
    const token = sessionStorage.getItem('token');

    if(token === null){
            return (<Redirect to="/login" />);
        
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
