import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Projects from "./Proyectos/Projects";
import Tasks from "./Proyectos/Tasks";
import InicioRecursos from "./CargaDeHoras/InicioRecursos";

// Pages
import SupportContainer from "./pages/support";
import PSANavBar from "./components/Navbar";

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
          <PSANavBar/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
