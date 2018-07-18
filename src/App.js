import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Converter from './Converter';

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
      currencies: []
     }
    this.fetchConversionRate = this.fetchConversionRate.bind(this);
  }

  componentDidMount() {
    fetch('https://free.currencyconverterapi.com/api/v6/countries')
    .then(res => res.json())
    .then(res => {
      this.setState({ currencies: Object.values(res.results) });
    })
  }

  fetchConversionRate() {
    const from = 'USD';
    const to = 'GBP';
    const API_PATH = `https://free.currencyconverterapi.com/api/v5/convert?q=${from}_${to}&compact=y`;

    fetch(API_PATH)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.setState({ rate: res.USD_GBP.val });
      });
  }

  submitParams(from, to) {
    const API_PATH = `https://free.currencyconverterapi.com/api/v5/convert?q=${from}_${to}&compact=y`;

    fetch(API_PATH)
      .then(res => res.json())
      .then(res => {
        console.log(res);
  });
}

  render() {
    return (
      <div className="App">
        <Converter fetchConversionRate={this.fetchConversionRate} rate={this.state.rate} submitParams={this.submitParams} currencies={this.state.currencies}/>
      </div>
    );
  }
}

export default App;
