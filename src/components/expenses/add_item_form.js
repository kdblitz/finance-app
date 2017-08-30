import React, { Component } from 'react';

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

    addItem() {
        this.props.onItemAdd(this.state);
        this.setState({
            name: '',
            quantity: '',
            price: ''
        });
    }

    renderInput({placeholder, data, type, className}) {
        const inputClass = `form-control ${className}`;
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
        console.log(!this.state.name.length, !this.state.quantity, !this.state.price)
        return !this.state.name.length || !this.state.quantity || !this.state.price;
    }

    render() {
        return (
            <div className="Add-item-form input-group">
                {this.renderInput({className:'name',placeholder:'Add new item', data: 'name', type: 'text'})}
                {this.renderInput({placeholder:'Quantity', data: 'quantity', type: 'number'})}
                {this.renderInput({placeholder:'Price', data: 'price', type: 'number'})}
                <span className="input-group-btn">
                    <button className="btn btn-secondary" type="button" 
                        disabled={this.isFormComplete()}
                        onClick={this.addItem}>Add</button>
                </span>
            </div>
        )
    }
}

export default AddItemForm;