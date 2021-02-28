import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Projects from "./Proyectos/Projects";
import Tasks from "./Proyectos/Tasks";
import InicioRecursos from "./CargaDeHoras/InicioRecursos";

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
          <InicioRecursos/>
        </Route>
        <Route path="/projects">
          <Projects />
        </Route>
        <Route path="/tasks/:projectId" component={Tasks}>
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
