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
        this.props.fetchRate(this.state.from, this.state.to);
    }

    renderSelectInput() {
        //sort currencies array before mapping for better ux.
        const sortedObj = this.props.currencies.sort((a, b) => {
            let textA = a.currencyName;
            let textB = b.currencyName;
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        return sortedObj.map((currency, index) => {
                    return (
                        <option key={index} 
                                value={currency.currencyId}>
                                    {currency.currencyName}
                        </option>
                    )
                });
    }

    render() {
        return (
            <div>
                <h2>Please choose two currencies to calculate conversion rate</h2>
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