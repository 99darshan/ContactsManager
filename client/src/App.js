import React from 'react';
import Home from './pages/Home';
import Add from './pages/Add';
import Details from './pages/Details';
import Edit from './pages/Edit';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import * as routes from './constants/routeConstants';
import { ContactsProvider } from "./appState/contactsContext";
import {initialState} from "./appState/contactsStore";
import {contactsReducer} from "./appState/contactsReducer";


function App() {
  return (
    <ContactsProvider reducer={contactsReducer} initialState={initialState}>
      <BrowserRouter>
      <Switch>
        <Route path={routes.HOME} exact><Home/></Route>
        <Route path={routes.ADD} exact><Add/></Route>
        {/* NOTE: render Details screen using the component prop not as a child, react router v5 will have an undefined match prop if used as a child instead of a component prop */}
        <Route path={routes.DETAILS} exact component={Details}></Route>
        {/* <Route path={routes.EDIT} exact><Edit/></Route> */} 
        <Route path={routes.EDIT} exact component={Edit}></Route>
        {/* TODO: add not found route and corresponding component */}
      </Switch>
    </BrowserRouter>
    </ContactsProvider>
    

  );
}

export default App;
