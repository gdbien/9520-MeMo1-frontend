import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Pages
import SupportContainer from "./pages/support";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/support">
          <SupportContainer/>
        </Route>
        <Route path="/personas">
          <h1> Recursos </h1>
        </Route>
        <Route path="/hours">
          <h1> Carga de horas </h1>
        </Route>
        <Route path="/">
          <h1> Home </h1>
          <p>
            <a href={"/personas"}>Modulo de recursos</a>
          </p>
          <p>
            <a href={"/proyecto"}>Modulo de proyectos</a>
          </p>
          <p>
            <a href={"/support"}>Modulo de soporte</a>
          </p>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
