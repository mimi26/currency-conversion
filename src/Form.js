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
        //reset 'from' and 'to' so it remains clear which input is which for 
        //subsequent calculations.
        this.setState({
            from: '',
            to: ''
        });
    }

    renderSelectInput() {
        //sort currencies array alphabetically before mapping for better ux.
        const sortedObjArr = this.props.currencies.sort((a, b) => {
            //sort array of objects by values of currencyName properties. 
            if (a.currencyName < b.currencyName) {
                return -1;
            } else if (a.currencyName > b.currencyName) {
                return 1;
            } else {
                return 0;
            }
        });
        // console.log('this is sorted:', sortedObjArr);
        //remove duplicate entries by leveraging Set datatype
        //which allows for has() and add() methods.
            const seen = new Set();
            const uniqueArr =  sortedObjArr.filter(item => {
                return seen.has(item.currencyName) ? false : seen.add(item.currencyName);
            })
        //map through sorted, filtered currency array to render drop down list.
        return uniqueArr.map((currency, index) => {
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
                <form onSubmit={this.handleSubmit} className="form">
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
                            value="submit"
                            className="submit" />
                </form>
            </div>
        );
    }
}

export default Form;