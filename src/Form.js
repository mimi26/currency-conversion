import React, { Component } from 'react';

class Form extends Component {
    constructor() {
        super();
        this.state = {
            from: '',
            to: '',
            currencies: []
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
        let currencies;
        this.props.currencies 
            ?  currencies = Object.values(this.props.currencies).map(currency => currency.currencyName).sort()
            : currencies = null;

        return this.props.currencies.map((currency, index) => {
                    return (
                        <option key={index} 
                                value={currency.currencyId}>
                                    {currencies[index]}
                        </option>
                    )
                });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <select value={this.state.from} 
                            name="from" 
                            onChange={this.handleChange}>
                        <option value="" disabled>FROM</option>
                        {this.renderSelectInput()}
                    </select>
                    <select value={this.state.to} 
                            name="to" 
                            onChange={this.handleChange}>
                        <option value="" disabled>TO</option>
                        {this.renderSelectInput()}
                    </select>
                    <input  type="submit"
                            value="submit" />
                </form>
            </div>
        );
    }
}

export default Form;