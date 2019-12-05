import React, { Component } from 'react';
import Form from './common/form';
import Joi from 'joi-browser';

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

  doSubmit = () => {
    // Here we can write logic to Call the server
    console.log('Submitted')
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password')}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  };
}
export default LoginForm;