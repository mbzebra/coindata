import React, { Component } from 'react'
import axios from 'axios';

  class TickerPrice extends Component {

      constructor(props) {
        super(props)
        this.state = {tickerPrice: '', tickerSymbol :''}
        

      }

      componentDidUpdate(){

        if(this.props.tickerSymbol!=this.state.tickerSymbol )
        {
            this.setState({tickerSymbol:this.props.tickerSymbol})
            var encodedURI = window.encodeURI('http://localhost:8080/api/0/public/OHLC?pair=' + this.props.tickerSymbol);
            axios
                .get(encodedURI)
                .then(response => {
                    this.setState({tickerPrice:Object.entries(Object.entries(Object.entries(response.data.result)[0][1])[0][1])[0][1]});
                })
                .catch((error) => {
                    console.log("error",error)
                })
        }   
      }

      render () {
        return (
            <div>
              <p>Symbol : {this.props.tickerSymbol} </p>
              <p>Price: {this.state.tickerPrice}</p>
            </div>
        )
      }
    }

    export default TickerPrice