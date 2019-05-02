import React, { Component } from 'react';
import axios from 'axios';

class Screener extends Component {
  constructor(props) {
    super(props);
      this.state = {
        ticker: "",
      };   
  }

  componentDidMount() {

    const id = "TSLA";

    axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${id}&apikey=DEMO`)
      .then(res => {
        console.log(res.data["Global Quote"]);
        this.setState(
          res.data["Global Quote"]
        )
      })
      .catch(err => console.log(err));
  }

  getStock = (event, ticker) => {
    event.preventDefault();

    axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.AV_API_KEY}`)
    .then(res => {
      console.log(res.data["Global Quote"]);
      this.setState(
        res.data["Global Quote"]
      )
    })
    .catch(err => console.log(err));

  }

  handleInput = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  render() {
    console.log("stock", this.state)
    return (
      <div>

        <form onSubmit={this.getStock(this.state.ticker)}>
          <input type="search" name="ticker" onChange={this.handleInput}></input>
          <button type="submit">Search</button>
        </form>

        <p>Symbol: {this.state["01. symbol"]}</p>
        <p>Price: {this.state["05. price"]}</p>
        <p>Change: {this.state["10. change percent"]}</p>

      </div>
    )
  }

}

export default Screener;