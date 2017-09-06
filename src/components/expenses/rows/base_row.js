import _ from 'lodash';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateComputation } from '../../../actions/computation_actions';

export default class BaseRow extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        this.compute();
    }

    componentWillReceiveProps(nextProps) {
        this.compute(nextProps);
    }

    compute(props = this.props) {
        const computations = {
            total: this.computeTotal(props),
            users: this.computeUsers(props)
        };
        this.setState(computations);
        if (!_.isEqual(this.state, computations)) {
            this.props.updateComputation({
                key: this.props.key,
                computations
            });
        }
    }

    computeUsers(props) {
        return _(props.expenseData.users)
            .mapValues((user, key) => this.computeUser(props, user, key))
            .value();
    }

    render() {
        return (
            <tr>
                <th>{this.props.label}</th>
                <td className="price" colSpan={2}>{this.state.total}</td>
                <td></td>
                {this.renderUserCellOfSpecialRow()} 
            </tr>
        )
    }

    renderUserCellOfSpecialRow() {
        return _(this.props.expenseData.users)
            .keys().map(user => <td key={user}>{this.state.users[user]}</td>)
            .value();
    }
}

export function setupReduxBindings(Row) {
    return connect(null, { updateComputation })(Row);
}