import _ from 'lodash';
import React, { Component } from 'react';

class ExpenseForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: ['user a','user b','user c'],
            items: [
                {name: 'item a', price: 100, quantity: 10},
                {name: 'item b', price: 200, quantity: 5},
                {name: 'item c', price: 300, quantity: 3}
            ],
            currentItem: ''
        }

        this.addItem = this.addItem.bind(this);
    }

    addItem() {
        const items = _.concat(this.state.items, {name:this.state.currentItem});
        this.setState({
            items,
            currentItem: ''
        });
    }
    
    render() {
        return (
            <div>
                <h2>Expense form</h2>
                <table className="table">
                    <thead>
                        <tr>
                            {this.renderItemHeader()}
                            {this.renderNameHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBody()}
                        {this.renderAddItemInput()}
                    </tbody>
                </table>
            </div>
        );
    }

    renderItemHeader() {
        return _.map(['Name', 'Quantity', 'Price'], name => <th key={name}>{name}</th>)
    }

    renderNameHeader() {
        return _.map(this.state.users, user => {
            return (
                <th key={user}>{user}</th>
            );
        });
    }

    renderBody() {
        return _.map(this.state.items, item => {
            return (
                <tr key={item.name}>
                    {this.renderItem(item)}
                    {this.renderExpense()}
                </tr>
            );
        })
    }

    renderItem(item) {
        return [
          (<td key='name'>{item.name}</td>),
          (<td key='quantity'>{item.quantity}</td>),
          (<td key='price'>{item.price}</td>)
        ];
    }

    renderExpense() {
        return _.map(this.state.users, user => {
            return (
                <td key={user}>
                    <div className="input-group">
                        <input type="text" className="form-control"/>
                    </div>
                </td>
            );
        });
    }

    renderAddItemInput() {
        return (
            <tr>
                <td>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Add new item"
                            onChange={(event) => this.setState({currentItem: event.target.value})}
                            value={this.state.currentItem} />
                        <span className="input-group-btn">
                            <button className="btn btn-secondary" type="button" 
                                disabled={!this.state.currentItem.length}
                                onClick={this.addItem}>Add</button>
                        </span>
                    </div>
                </td>
                <td></td>
                <td>{this.computeTotal()}</td>
            </tr>
        );
    }

    computeTotal() {
        return _(this.state.items).map(item => item.quantity * item.price)
            .reduce((result,item) => result + item, 0)
    }
}

export default ExpenseForm;