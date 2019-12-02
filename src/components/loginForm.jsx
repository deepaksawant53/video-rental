import React, { Component } from 'react';

class LoginForm extends Component {
  state = {
    account: { username: '', password: '' }
  }
  username = React.createRef();
  handleSubmit = e => {
    e.preventDefault();//This prevents the default submit action in which the whole page gets reloaded and due to which bundle.js and login.html was getting reloaded.

    // Here we can write logic to Call the server
    const username = this.username.current.value;
    console.log('Username', username);
  }

  handleChange = e => {
    const account = { ...this.state.account };
    account.username = e.currentTarget.value;
    this.setState({ account });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input onChange={this.handleChange} value={this.state.account.username} autoFocus ref={this.username} id="username" type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="text" className="form-control" />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}
export default LoginForm;