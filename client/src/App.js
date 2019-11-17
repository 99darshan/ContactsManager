import React,{useContext} from "react";
import Contacts from "./pages/Contacts";
import Add from "./pages/Add";
import Details from "./pages/Details";
import Edit from "./pages/Edit";
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
          <Route path={routes.HOME} component={Home} exact />
          {/* TODO: add not found route and corresponding component */}
        </Switch>
      </BrowserRouter>
    </ContactsProvider>
    </AuthProvider>
  );
}

export default App;
