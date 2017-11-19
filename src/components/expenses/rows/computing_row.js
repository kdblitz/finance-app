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
            users: {},
            showConfig: false
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
            (<th key="label">{this.props.label} 
              { this.renderConfigurations() }
              </th>),
            (<td key="price" className="price" colSpan={2}>{this.renderOverallCell()}</td>)
        ];
    }

    renderConfigurations() {
        if (!this.props.hasWriteAccess) {
            return null;
        }
        const configurationButton = this.props.configurable ?
            <span className="oi oi-wrench" onClick={() => this.setState({showConfig: !this.state.showConfig})}></span> : null;
        const deleteButton = this.props.allowDeletion ?
            <button type="button" className="btn btn-danger btn-sm" onClick={() => this.removeSpecialRow(this.constructor.name)}>-</button> : null;
        const configuration = this.state.showConfig ? this.renderConfig() : '';
        
        return (<span>
            {configurationButton} {deleteButton} <br/>
            {configuration}
        </span>);
    }

    removeSpecialRow(rowName) {
        this.props.removeSpecialRow(rowName);
        this.props.removeComputationForKey(this.props.key);
    }

    renderConfig() {
      return '';
    }

    renderOverallCell() {
        return this.state.total ? this.state.total.toFixed(2): 0;
    }

    renderSharingCell() {
        return <td></td>;
    }

    renderUserCells() {
        return _(this.state.users)
            .map(this.renderUserCell)
            .value();
    }

    renderUserCell(value, index) {
        return <td key={index} className="price">{typeof value === 'number' ? value.toFixed(2): ''}</td>;
    }
}

/* 
configurable properties of defaultProps
fields marked with * are required

RowName.defaultProps = {
  *label: 'Your label',
  *key: 'uniqueKey',
  allowDeletion: false,
  defaultConfig: {},
  configurable: false
}
*/

export function setupReduxBindings(Row) {
    return connect(null, { 
      updateComputation, removeComputationForKey, 
      removeSpecialRow, updateRowConfig
    })(Row);
}