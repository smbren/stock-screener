import React, { Component } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Screener extends Component {
  constructor(props) {
    super(props);
      this.state = {
        ticker: "",
      };   
  }

  getStock = (e, ticker) => {
    e.preventDefault();
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

        <Form onSubmit={(e) => this.getStock(e, this.state.ticker)}>
          <Form.Control type="search" name="ticker" onChange={this.handleInput} />
          <Button as="input" type="submit" value="Submit" />
        </Form>

        <p>Symbol: {this.state["01. symbol"]}</p>
        <p>Price: {this.state["05. price"]}</p>
        <p>Change: {this.state["10. change percent"]}</p>

      </div>
    )
  }

}

export default Screener;