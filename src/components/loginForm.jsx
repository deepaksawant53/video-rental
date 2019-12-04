import React, { Component } from 'react';
import Input from './common/input';
import Joi from 'joi-browser';

class LoginForm extends Component {
  state = {
    account: { username: '', password: '' },
    errors: {}
  }

  // This we are writing outside state because this will be initialised only once. 
  // It is a schema for joi validation library.
  schema = {
    username: Joi.string().required().label('Username'),// Label is used to define friendly name of field in the error message.
    password: Joi.string().required().label('Password')
  }

  validate = () => {
    const options = { abortEarly: false };
    // Error object returned by Joi.validate() is as follows
    // {"error":
    //    {
    //      "isJoi":true,
    //      "name":"ValidationError",
    //      "details":[
    //          {"message":"\"Username\" is not allowed to be empty","path":["username"],"type":"any.empty","context":{"value":"","invalids":[""],"key":"username","label":"Username"}},
    //          {"message":"\"Password\" is not allowed to be empty","path":["password"],"type":"any.empty","context":{"value":"","invalids":[""],"key":"password","label":"Password"}}
    //      ],
    //      "_object":{"username":"","password":""}},
    //      "value":{"username":"","password":""}
    // }
    const { error } = Joi.validate(this.state.account, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  }

  handleSubmit = e => {
    e.preventDefault();//This prevents the default submit action in which the whole page gets reloaded and due to which bundle.js and login.html was getting reloaded.

    const errors = this.validate();
    // Here if errors value is truthy then it will set errors else it will set empty object inside errors.
    this.setState({ errors: errors || {} });
    if (errors) return;

    // Here we can write logic to Call the server
    console.log('Submitted')
  }

  validateProperty = ({ name, value }) => {
    if (name === "username") {
      if (value === "") return "Username is required!!!"
    }
    if (name === "password") {
      if (value === "") return "Password is required!!!"
    }
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  }

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}
            error={errors.password}
          />

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}
export default LoginForm;