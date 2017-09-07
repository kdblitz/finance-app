import _ from 'lodash';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateComputation } from '../../../actions/computation_actions';

export default class BaseRow extends Component {
    render() {
        return (
            <tr>
                <th>{this.props.label}</th>
                <td className="price" colSpan={2}>{this.renderOverallCell()}</td>
                <td></td>
                {this.renderUserCells()} 
            </tr>
        )
    }
    
    renderOverallCell() {
        throw new Error('please implement this method');
    }

    renderUserCells() {
        throw new Error('please implement this method');
    }
}

export function setupReduxBindings(Row) {
    return connect(null, { updateComputation })(Row);
}