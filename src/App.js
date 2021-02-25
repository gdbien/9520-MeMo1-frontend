import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Projects from "./Proyectos/Projects";
import Tasks from "./Proyectos/Tasks";

function App() {
  let projectId;
  return(
  <Router>
    <Switch>
      <Route path="/projects">
        <Projects />
      </Route>
      <Route path="/tasks/:projectId" component={projectId}>
        <Tasks codeId={projectId}/>
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
