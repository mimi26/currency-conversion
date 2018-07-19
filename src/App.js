import React, { Component } from 'react';

import './App.css';
import Form from './Form';
import Layout from './Layout';
// import Converter from './Converter';

// const API_PATH = 'https://free.currencyconverterapi.com/api/v5/convert?q=USD_GBP&compact=y'

// const converter = (Wrapped) => {
//   class HOC extends React.Component {
//     state = { rate: null }

//     componentDidMount() {
//       fetch(API_PATH)
//         .then(res => res.json())
//         .then(res => {
//           console.log(res)
//           this.setState({ rate: res.USD_GBP.val })
//         })
//     }
//     render() {
//       return <Wrapped rate={this.state.rate} />
//     }
//   }
//   return HOC
// }


// const LayoutRate = ({ rate }) => {
//   if (rate === null) {
//     return <div>Loading rate</div>
//   }
//   return <div>The conversion rate from USD to GBP is {rate}</div>
// }

// const WrappedLayout = converter(LayoutRate)

// const App = () => <WrappedLayout />

class App extends Component {
  constructor() {
    super();
    this.state = { 
      rate: null,
      currencies: [],
      from: '',
      to: ''
     }
    this.fetchRate = this.fetchRate.bind(this);
  }

  componentDidMount() {
    //fetch all currency data for user input drop down list.
    fetch('https://free.currencyconverterapi.com/api/v6/countries')
    .then(res => res.json())
    .then(res => {
      const currencies = Object.values(res.results);
      this.setState({ currencies });
    });
  }

  fetchRate(from, to) {
    const API_PATH = `https://free.currencyconverterapi.com/api/v5/convert?q=${from}_${to}&compact=y`;
    fetch(API_PATH)
      .then(res => res.json())
      .then(res => {
        let currencyIdArr = Object.keys(res)[0].split("_");
        this.setState({ 
          rate: Object.values(res)[0].val,
          from: currencyIdArr[0],
          to: currencyIdArr[1]
        });
      });
}

  render() {
    return (
      <div className="App">
        <Form fetchRate={this.fetchRate} currencies={this.state.currencies} />
        {this.state.rate 
            ? <Layout rate={this.state.rate} from={this.state.from} to={this.state.to} /> 
            : null}
      </div>
    );
  }
}

export default App;
