import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import InicioRecursos from "./CargaDeHoras/InicioRecursos";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/support">
          <h1> Soporte </h1>
        </Route>
        <Route path="/personas">
          <InicioRecursos/>
        </Route>
        <Route path="/">
          <h1> Home </h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
