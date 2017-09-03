import _ from 'lodash';

import React, { Component } from 'react';

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
        const state = {
            total: this.computeTotal(props),
            users: this.computeUsers(props)
        };
        this.setState(state);
        this.props.updateComputation(state);
    }

    computeUsers(props) {
        return _(props.expenseData.users)
            .mapValues(user => this.computeUser(props, user))
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