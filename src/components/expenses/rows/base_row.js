import _ from 'lodash';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateComputation } from '../../../actions/computation_actions';

export default class BaseRow extends Component {
    render() {
        return (
            <tr>
                {this.renderHeaderCells()}
                <td>{this.renderSharingCell()}</td>
                {this.renderUserCells()} 
            </tr>
        )
    }

    renderHeaderCells() {
        throw new Error('please implement this method');
    }

    renderOverallCell() {
        throw new Error('please implement this method');
    }

    renderSharingCell() {
        throw new Error('please implement this method');
    }

    renderUserCells() {
        throw new Error('please implement this method');
    }
}

export function setupReduxBindings(Row) {
    return connect(null, { updateComputation })(Row);
}