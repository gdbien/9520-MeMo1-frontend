import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/support">
          <h1> Soporte </h1>
        </Route>
        <Route path="/resources">
          <h1> Recrusos </h1>
        </Route>
        <Route path="/hours">
          <h1> Carga de horas </h1>
        </Route>
        <Route path="/">
          <h1> Home </h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
