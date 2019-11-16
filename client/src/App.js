import React from "react";
import Contacts from "./pages/Contacts";
import Add from "./pages/Add";
import Details from "./pages/Details";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as routes from "./constants/routeConstants";
import ContactsProvider from "./appState/contactsContext";
import AuthProvider from "./appState/authContext";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
    <AuthProvider>
    <ContactsProvider>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path={routes.CONTACTS} component={Contacts} exact />
          <PrivateRoute path={routes.ADD} component={Add} exact />
          <PrivateRoute path={routes.DETAILS} component = {Details} exact />
          <PrivateRoute path={routes.EDIT} component={Edit} exact />
          <Route path={routes.LOGIN} component = {Login} exact />
          <Route path={routes.HOME} component={Home} exact />
          {/* TODO: add not found route and corresponding component */}

          {/* NOTE: render Details screen using the component prop not as a child, react router v5 will have an undefined match prop if used as a child instead of a component prop */}
          {/* <Route path={routes.DETAILS} exact component={Details}></Route> */}

        </Switch>
      </BrowserRouter>
    </ContactsProvider>
    </AuthProvider>
  );
}

export default App;
