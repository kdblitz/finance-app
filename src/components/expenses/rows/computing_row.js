import _ from 'lodash';

import React from 'react';
import { connect } from 'react-redux';

import BaseRow from './base_row';
import { removeSpecialRow, updateRowConfig } from '../../../actions/expense_actions';
import { updateComputation, removeComputationForKey } from '../../../actions/computation_actions';

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
        // console.log('recompute', this.constructor.name);
        this.compute(nextProps);
    }

    compute(props = this.props) {
        const computations = {
            total: this.computeTotal(props),
            users: this.computeUsers(props),
        };
        if (!_.isEqual(_.pick(this.state, ['total', 'users']), computations)) {
            // console.log('trigger recompute', this.constructor.name, this.state, computations);
            this.props.updateComputation({
                key: this.props.key,
                computations
            });
        }
        const config = props.config || this.props.defaultConfig;
        if (!_.isEqual(config, props.config)) {
            this.props.updateRowConfig(
                this.constructor.name, config
            );
        }
        this.setState(_.merge(computations, config));
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
                  onClick={() => this.removeSpecialRow(this.constructor.name)}>-</button> 
                : '' }
              <br/>
              {this.renderConfig()}
              </th>),
            (<td key="price" className="price" colSpan={2}>{this.renderOverallCell()}</td>)
        ];
    }

    removeSpecialRow(rowName) {
        this.props.removeSpecialRow(rowName);
        this.props.removeComputationForKey(this.props.key);
    }

    renderConfig() {
      return '';
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
    return connect(null, { 
      updateComputation, removeComputationForKey, 
      removeSpecialRow, updateRowConfig
    })(Row);
}