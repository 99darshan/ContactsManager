import React from 'react';
import Home from './pages/Home';
import Add from './pages/Add';
import Details from './pages/Details';
import Edit from './pages/Edit';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact><Home/></Route>
        <Route path="/add" exact><Add/></Route>
        {/* TODO: probably should pass in an id as route param ?? */}
        <Route path="/details" exact><Details/></Route>
        <Route path="/edit" exact><Edit/></Route>

      </Switch>
    </BrowserRouter>

  );
}

export default App;
