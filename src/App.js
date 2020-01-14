import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import jwtDecode from 'jwt-decode';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/common/notFound'
import Navbar from './components/navbar';
import LoginForm from './components/loginForm';
import MovieForm from './components/movieForm';
import RegistrationForm from './components/registrationForm';
import Logout from './components/logout';
import authService from './services/authService';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/common/protectedRoute';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = authService.getCurrentUser();
    this.setState({ user });
  };
  
  render() {
    const {user} = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            {/* <Route path="/movies/new" component={MovieForm} /> */}
            <Route path="/movies" 
              render={props => <Movies {...props} user={this.state.user} />} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <ProtectedRoute
              path="/movie/:id" 
              component={MovieForm}
            />
            <Route path="/register" component={RegistrationForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment >
    );
  }
}

export default App;
