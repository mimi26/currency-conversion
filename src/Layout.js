import React, { Component } from 'react';




const Layout = ({ rate, from, to }) => {
    if (!rate) {
            return <div className="output">Loading rate</div>
        }
        return <div className="output">The conversion rate from {from} to {to} is {rate}</div>
    
}


    

export default Layout;