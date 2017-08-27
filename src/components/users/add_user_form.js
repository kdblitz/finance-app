import React, { Component } from 'react';

class AddUserForm extends Component {
    render() {
        return (
            <div>
                <h2>Add User</h2>
                <form>
                    <div className="row">
                        <div className="form-group col-sm">
                            <label>Name</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group col-sm-8">
                            <label>Email Address</label>
                            <input type="email" className="form-control" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
        );
    }
}

export default AddUserForm;