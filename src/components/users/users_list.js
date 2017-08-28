import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class UsersList extends Component {
    renderUsers() {
        return _.map(this.props.Users, user => {
            return (
                <div key={user.name}
                    className="list-group-item">{user.name}</div>
            );
        });
    }

    render() {
        return (
            <div>
                <h2>Users</h2>
                <div className="list-group">
                    {this.renderUsers()}
                </div>
            </div>
        );
    }
}

function mapStateToProps({Users}) {
    return {
        Users
    };
}

export default connect(mapStateToProps)(UsersList);