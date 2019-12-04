import React, { Component } from 'react';
import Input from './common/input';

class LoginForm extends Component {
  state = {
    account: { username: '', password: '' },
    errors: {}
  }

  validate = () => {
    const errors = {};

    const { account } = this.state;
    if (account.username.trim() === '')
      errors.username = 'Username is required';
    if (account.password.trim() === '')
      errors.password = 'Password is required';

    return Object.keys(errors).length === 0 ? null : errors;
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

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
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