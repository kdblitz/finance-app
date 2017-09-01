import React, { Component } from 'react';

class AddUserForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name:''
        };
        this.addUser = this.addUser.bind(this);
    }

    addUser(event) {
        event.preventDefault();
        this.props.onUserAdd(this.state);
        this.setState({
            name:''
        });
    }

    render() {
        return (
            <form onSubmit={this.addUser}>
                <div className="input-group">
                    <input className="form-control" type="text"
                        placeholder="Add user"
                        value={this.state.name}
                        onChange={event =>this.setState({name: event.target.value})}/>
                    <span className="input-group-btn">
                        <button type="submit" className="btn">+</button>
                    </span>
                </div>
            </form>
        );
    }
}

export default AddUserForm;