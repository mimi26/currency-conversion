import React, { Component } from 'react';
import Layout from './Layout';
import Form from './Form';

class Converter extends Component {
    constructor() {
        super();
        
    }

    // componentDidMount() {
    //     this.props.fetchConversionRate();
    // }

    render() {
        return (
            <div>
                <Form submitParams={this.props.submitParams} currencies={this.props.currencies} />
                {this.props.rate ? <Layout rate={this.props.rate} /> : null}
                
            </div>
        );
    }
}

export default Converter;