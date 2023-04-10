import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
// import { Users } from './user/pages/Users';
// import { NewPlace } from './places/pages/NewPlace';
// import { UserPlaces } from './places/pages/UserPlaces';
// import { UpdatePlace } from "./places/pages/UpdatePlace";
// import { AuthUser } from "./user/pages/AuthUser";
import { MainNavigation } from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import { LoadingSpinner } from "./shared/components/UIElements/LoadingSpinner";

import "./root-variables.css";

// code splitting for lazy loading
const Users = React.lazy(() => import("./user/pages/Users"));
const NewPlace = React.lazy(() => import("./places/pages/NewPlace"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace"));
const AuthUser = React.lazy(() => import("./user/pages/AuthUser"));

const App = () => {
  const { login, logout, token, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:userID/places' exact>
          <UserPlaces />
        </Route>
        <Route path='/places/new' exact>
          <NewPlace />
        </Route>
        <Route path='/places/:placeID'>
          <UpdatePlace />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:userID/places' exact>
          <UserPlaces />
        </Route>
        <Route path='/auth'>
          <AuthUser />
        </Route>
        <Redirect to='/auth' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className='center'>
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
