import React, { Component } from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import authService from '../services/authService';
class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {}
  };

  // This we are writing outside state because this will be initialised only once. 
  // It is a schema for joi validation library.
  schema = {
    username: Joi.string().required().label('Username'),// Label is used to define friendly name of field in the error message.
    password: Joi.string().required().label('Password')
  };

  doSubmit = async () => {
    const { data } = this.state;
    // Here we can write logic to Call the server
    await authService.login(data.username, data.password);
    console.log('Submitted')
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  };
}
export default LoginForm;