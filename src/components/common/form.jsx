import React, { Component } from 'react';
import Joi from 'joi-browser';

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    // This abortEarly property is of Joi and by default it is true.
    // What happens if it is true is that whenever it will get first field with error it will exit from their itself and it wont check for other fields.
    // But in this method we want to validate our entire page hence we dont want abortEarly behaviour here hence we are explicitly setting it as false.
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
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    // Here we are not setting abortEarly to false because we want to validate single fields
    // and hence when it finds any field mentioned in schema to violate the rule it should give us the error message.
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();//This prevents the default submit action in which the whole page gets reloaded and due to which bundle.js and login.html was getting reloaded.

    const errors = this.validate();
    // Here if errors value is truthy then it will set errors else it will set empty object inside errors.
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

}
export default Form;