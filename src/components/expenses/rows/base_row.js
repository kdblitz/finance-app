import _ from 'lodash';

import React, { Component } from 'react';

export default class BaseRow extends Component {
    getLabel() {
        return this.props.label ? this.props.label : this.getDefaultLabel();
    }

    render() {
        return (
            <tr>
                <th>{this.getLabel()}</th>
                <td className="price" colSpan={2}>{this.computeTotal()}</td>
                <td></td>
                {this.renderUserCellOfSpecialRow()} 
            </tr>
        )
    }

    renderUserCellOfSpecialRow() {
        return _(this.props.expenseData.users)
            .keys().map(user => <td key={user}>{this.computeUser(user)}</td>)
            .value();
    }
}