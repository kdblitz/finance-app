import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../actions/expense_actions';

import Item from './models/item.js';

import './add_item_form.css';

class AddItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            quantity: '',
            price:''
        };

        this.addItem = this.addItem.bind(this);
    }

    addItem(event) {
        event.preventDefault();
        this.props.addItem(new Item(this.state));
        this.setState({
            name: '',
            quantity: '',
            price: ''
        });
    }

    renderInput({placeholder, data, type}) {
        const inputClass = `form-control add-item-${data}`;
        return (
            <input
                type={type}
                className={inputClass}
                placeholder={placeholder}
                onChange={(event) => this.setState(
                    {[data]: (type!=='number') ? event.target.value : Number(event.target.value)})}
                value={this.state[data]} />
        )
    }

    isFormComplete() {
        return !this.state.name.length || !this.state.quantity || !this.state.price;
    }

    render() {
        return (
            <form onSubmit={this.addItem} className="Add-item-form" >
                <div className="input-group">
                    {this.renderInput({placeholder:'Add new item', data: 'name', type: 'text'})}
                    {this.renderInput({placeholder:'Qty', data: 'quantity', type: 'number'})}
                    {this.renderInput({placeholder:'Price', data: 'price', type: 'number'})}
                    <span className="input-group-btn">
                        <button className="btn btn-secondary" type="submit"
                            disabled={this.isFormComplete()}>Add</button>
                        <button type="button"
                            className="btn btn-secondary dropdown-toggle dropdown-toggle-split"
                            data-toggle="dropdown">
                                <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <div className="dropdown-menu">
                            <button className="dropdown-item" type="button">Action</button>
                        </div> 
                    </span>
                </div>
            </form>
        )
    }
}

export default connect(null,{addItem})(AddItemForm);