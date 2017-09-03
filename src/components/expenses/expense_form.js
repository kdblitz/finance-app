import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExpenseData, saveExpenseData } 
    from '../../actions/expense_actions';

import './expense_form.css';
import AddUserForm from './add_user_form';
import AddItemForm from './add_item_form';
import ItemRow from './rows/item_row';

const rows = {
    SubtotalRow: require('./rows/subtotal_row').default,
    ServiceChargeRow: require('./rows/service_charge_row').default
}

class ExpenseForm extends Component {
    componentDidMount() {
        this.props.fetchExpenseData();
    }

    render() {
        return (
            <div className="Expense-form">
                <h2>Expense form</h2>
                <table className="table">
                    <thead>
                        <tr>
                            {this.renderItemHeader()}
                            <th className="shared">Shared?</th>
                            {this.renderNameHeader()}
                            <th className="addUser">
                                <AddUserForm />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBody()}
                        {this.renderSpecialRows()}
                        {this.renderItemAdderRow()}
                    </tbody>
                </table>
                <button className="btn btn-primary"
                    onClick={()=>this.saveExpense()}>Save</button>
            </div>
        );
    }

    renderItemHeader() {
        return _.map(['Name', 'Quantity', 'Price'], 
            name => <th key={name} className={name.toLowerCase()}>{name}</th>);
    }

    renderNameHeader() {
        return _.keys(this.props.CurrentExpense.users).map(user => {
            return (
                <th key={user} className="users">{user}</th>
            );
        });
    }

    renderBody() {
        return _.map(this.props.CurrentExpense.items, item => {
            return (<ItemRow key={item.name} item={item} users={this.props.CurrentExpense.users} />);
        });
    }

    renderSpecialRows() {
        return _.map(this.props.CurrentExpense.rows, row => {
            const SpecialRow = rows[row];
            return (<SpecialRow key={row} expenseData={this.props.CurrentExpense} />);
        });
    }

    renderItemAdderRow() {
        return <tr><td colSpan="3"><AddItemForm /></td></tr>;
    }

    saveExpense() {
        const { users, items, rows } = this.props.CurrentExpense; 
        this.props.saveExpenseData({
            users,
            items,
            rows
        });
    }

}

function mapStateToProps({CurrentExpense}) {
    return {
        CurrentExpense
    };
}

export default connect(mapStateToProps, {
    fetchExpenseData,
    saveExpenseData
})(ExpenseForm);