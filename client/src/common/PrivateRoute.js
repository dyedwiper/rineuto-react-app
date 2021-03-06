import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoadingPage from '../pages/LoadingPage';
import UserContext from '../userContext';

export default function PrivateRoute({ children, isLoadingUser }) {
  const { user } = useContext(UserContext);
  const loggedIn = Object.keys(user).length !== 0;

  if (isLoadingUser) {
    return (
      <Route>
        <LoadingPage />
      </Route>
    );
  }

  return <Route>{loggedIn ? children : <Redirect to="/login" />}</Route>;
}
