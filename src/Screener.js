import React, { Component } from 'react';
import axios from 'axios';

class Screener extends Component {
  constructor(props) {
    super(props);
      this.state = {};   
  }

  componentDidMount() {

    const id = "TSLA";

    axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${id}&apikey=${process.env.AV_API_TOKEN}`)
      .then(res => {
        console.log(res.data["Global Quote"]);
        this.setState(
          res.data["Global Quote"]
        )
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log("stock", this.state)
    return (
      <div>

        <p>Symbol: {this.state["01. symbol"]}</p>
        <p>Price: {this.state["05. price"]}</p>
        <p>Change: {this.state["10. change percent"]}</p>

      </div>
    )
  }

}

export default Screener;