import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class UsersList extends Component {
    renderUsers() {
        return _.map(this.props.Users, user => {
            return (
                <div key={user.name} className="list-group-item">
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{user.name}</h5>
                        <small className="text-muted">{user.email}</small>
                    </div>
                </div>
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