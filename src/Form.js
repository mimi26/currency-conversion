import React, { Component } from 'react';

class Form extends Component {
    constructor() {
        super();
        this.state = {
            from: '',
            to: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const val = event.target.value;
        this.setState({ [name]: val });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.submitParams(this.state.from, this.state.to);
    }

    renderSelectInput() {
        return (
            <select>
            {this.props.currencies.map(currency => {
            return (
                    <option value={currency.currencyId}>{currency.currencyName}</option>
            )
        })}
            </select>
        )
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {this.renderSelectInput()}
                    <input  type="text"
                            value={this.state.from}
                            name="from"
                            placeholder="FROM"
                            onChange={this.handleChange} />
                    <input  type="text"
                            value={this.state.to}
                            name="to"
                            placeholder="TO"
                            onChange={this.handleChange} />
                    <input  type="submit"
                            value="submit" />
                </form>
            </div>
        );
    }
}

export default Form;