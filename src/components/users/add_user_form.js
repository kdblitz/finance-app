import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addUser } from '../../actions/user_actions';

class AddUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
  submitForm(event) {
    event.preventDefault();
    const { name, email } = this.state;
    this.props.addUser({
      email,
      name
    });
  }
  render() {
    return (
      <div className="col-md">
        <h2>Add User</h2>
        <form onSubmit={this.submitForm}>
          <div className="row">
            <div className="form-group col-sm">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={this.handleInputChange}
                value={this.state.name} />
            </div>
            <div className="form-group col-sm-8">
              <label>Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.handleInputChange}
                value={this.state.email} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary float-right">Add</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { addUser })(AddUserForm);