import React, { Component } from 'react';
import Layout from './Layout';
import Form from './Form';

class Converter extends Component {
    constructor() {
        super();
        
    }

    componentDidMount() {
        this.props.fetchConversionRate();
    }

    render() {
        return (
            <div>
                <Layout rate={this.props.rate}/>
                <Form submitParams={this.props.submitParams} currencies={this.props.currencies} />
            </div>
        );
    }
}

export default Converter;