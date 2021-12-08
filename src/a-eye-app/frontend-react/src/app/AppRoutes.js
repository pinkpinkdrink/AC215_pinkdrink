import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from "../components/Home";
import Error404 from '../components/Error/404';

const AppRouter = (props) => {

  console.log("================================== AppRouter ======================================");

  return (
    <React.Fragment>
      <Switch>
        <Route path="/" render={(props2) => (<Home {...props2} selectedIndex={props.selectedIndex} options={props.options}/>)} />
        <Route component={Error404} />
      </Switch>
    </React.Fragment>
  );
}

export default AppRouter;