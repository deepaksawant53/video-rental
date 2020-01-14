import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import auth from '../../services/authService';

const ProtectedRoute = ({path, component: Component, render, ...rest}) => {//When we use Route we supply component or a render function hence render in the parameter list.

  return (
    <Route 
      {...rest }      
      render={props => {
        console.log(props);
        if (!auth.getCurrentUser()) return <Redirect to={{
          pathname: "/login",
          state: { from: props.location }
        }} />
        // React expects components to start with a uppercase letter hence we are naming it with a uppercase C.
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};
export default ProtectedRoute;