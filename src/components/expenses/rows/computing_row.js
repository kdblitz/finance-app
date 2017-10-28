import _ from 'lodash';

import React from 'react';
import { connect } from 'react-redux';

import BaseRow from './base_row';
import { removeSpecialRow } from '../../../actions/expense_actions';
import { updateComputation } from '../../../actions/computation_actions';

export default class ComputingRow extends BaseRow {
    constructor(props) {
        super(props);

        this.state = {
            total: 0,
            users: {}
        };
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

    renderHeaderCells() {
        return [
            (<th key="label">{this.props.label} { 
              this.props.allowDeletion
                ? <button type="button" className="btn btn-danger btn-sm"
                  onClick={() => this.props.removeSpecialRow(this.constructor.name)}>-</button> 
                : '' }</th>),
            (<td key="price" className="price" colSpan={2}>{this.renderOverallCell()}</td>)
        ];
    }

    renderOverallCell() {
        return this.state.total;
    }

    renderSharingCell() {
        return <td></td>;
    }

    renderUserCells() {
        return _(this.state.users)
            .map(this.renderUserCell)
            .value();
    }

    renderUserCell(user, index) {
        return <td key={index}>{user}</td>;
    }
}

export function setupReduxBindings(Row) {
    return connect(null, { updateComputation, removeSpecialRow })(Row);
}