import _ from 'lodash';
import React, { Component } from 'react';

class ExpenseForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: ['user a','user b','user c'],
            items: [
                {name: 'item a'},
                {name: 'item b'},
                {name: 'item c'}
            ],
            currentItem: ''
        }

        this.addItem = this.addItem.bind(this);
    }

    addItem(event) {
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
                            <th></th>
                            {this.renderHeader()}  
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

    renderHeader() {
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
                    <td>{item.name}</td>
                    {this.renderExpense()}
                </tr>
            );
        })
    }

    renderExpense() {
        return _.map(this.state.users, user => {
            return (
                <th key={user}>
                    <div className="input-group">
                        <input type="text" className="form-control"/>
                    </div>
                </th>
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
            </tr>
        );
    }
}

export default ExpenseForm;