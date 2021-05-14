import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Carteras } from "../componets/carteras/Carteras";

export const DashboardRoutes = () => {
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
