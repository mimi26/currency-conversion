import React, { Component } from 'react';

class Layout extends Component {
    render() {
        if (this.props.rate === null) {
            return <div>Loading rate</div>
        }
        return <div>The conversion rate from USD to GBP is {this.props.rate}</div>
    }
}


export default Layout;