import React, { Component } from 'react';

import './App.css';
import Form from './Form';
import Layout from './Layout';

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

  async fetchRate(from, to) {
    const API_PATH = `https://free.currencyconverterapi.com/api/v5/convert?q=${from}_${to}&compact=y`;
    try {
      const res = await fetch(API_PATH);
      const currencyRes = await res.json();
      //response object has from and to codes as its key separated by "_".
      //leverage this for use in result desplay in Layout component.
      const currencyIdArr = Object.keys(currencyRes)[0].split("_");
      this.setState({
        rate: Object.values(currencyRes)[0].val,
        from: currencyIdArr[0],
        to: currencyIdArr[1]
      })
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    //fetch all currency data for user input drop down lists.
    fetch('https://free.currencyconverterapi.com/api/v6/countries')
    .then(res => res.json())
    .then(res => {
      const currencies = Object.values(res.results);
      this.setState({ currencies });
    });
  }

//   fetchRate(from, to) {
//     const API_PATH = `https://free.currencyconverterapi.com/api/v5/convert?q=${from}_${to}&compact=y`;
//     fetch(API_PATH)
//       .then(res => res.json())
//       .then(res => {
//         let currencyIdArr = Object.keys(res)[0].split("_");
//         this.setState({ 
//           rate: Object.values(res)[0].val,
//           from: currencyIdArr[0],
//           to: currencyIdArr[1]
//         });
//       });
// }

  render() {
    const { currencies, rate, from , to } = this.state;
    return (
      <div className="container">
        <Form fetchRate={this.fetchRate} currencies={currencies} />
        {rate 
            ? <Layout rate={rate} from={from} to={to} /> 
            : null}
      </div>
    );
  }
}

export default App;
