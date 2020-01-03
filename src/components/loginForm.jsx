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
    try {
      const { data } = this.state;
      const { data: jwt } = await authService.login(data.username, data.password);
      localStorage.setItem("token", jwt);
      //   this.props.history.push("/");
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors });
      }
    }
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