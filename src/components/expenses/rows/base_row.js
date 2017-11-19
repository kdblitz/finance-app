import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateComputation } from '../../../actions/computation_actions';

import _ from 'lodash';

export default class BaseRow extends Component {
  render() {
    const rowClass = `${_.kebabCase(this.constructor.name)} ${this.determineRowStyle()}`;
    return (
      <tr className={rowClass}>
        {this.renderHeaderCells()}
        {this.renderSharingCell()}
        {this.renderUserCells()}
      </tr>
    );
  }

  determineRowStyle() {
    return '';
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

  getUsers(props = this.props) {
    const expense = props.expenseData;
    return expense ? expense.users : {};
  }
}

export function setupReduxBindings(Row) {
  return connect(null, { updateComputation })(Row);
}