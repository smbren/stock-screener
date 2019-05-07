import React, { Component } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import FormControl from 'react-bootstrap/FormControl';

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
    console.log("stock", this.state);
    console.log("change", this.state["9. change"]);
    return (
      <div>

        <Navbar fixed="top" bg="primary" variant="dark">

          <Navbar.Brand href="#home">Screener</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>

          <Form inline onSubmit={(e) => this.getStock(e, this.state.ticker)}>
            <FormControl type="search" name="ticker" onChange={this.handleInput} />
            <Button variant="outline-light" type="submit">Search</Button>
          </Form>
          
        </Navbar>

        <p>Symbol: {this.state["01. symbol"]}</p>
        <p>Price: {this.state["05. price"]}</p>
        <p>Change:</p> <p style={{color: this.state["9. change"] > 0 ? 'green' : 'red'}}>{this.state["10. change percent"]}</p>

      </div>
    )
  }

}

export default Screener;