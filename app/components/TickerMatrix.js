import React, { Component } from 'react'
import axios                from 'axios';
import TickerPrice          from './TickerPrice';

  class TickerMatrix extends Component {

      constructor(props) {
        super(props)
   
        this.state = {tickerSymbols: ''};
        this.state = {tickerSelected : 'DASHUSD'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event)
      {
        this.setState({tickerSelected: event.target.value});
        
      }

      handleSubmit(event)
      {
        this.setState({tickerSelected: event.target.value});
           // alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
        
      }

      componentDidMount(){
        
            var sval = { "val" : []};
            var encodedURI = window.encodeURI('http://localhost:8080/api/0/public/AssetPairs');
            axios
                .get(encodedURI)
                .then(response => {
                  
                  
                  Object.keys(response.data.result).forEach(function(key){
                      if(response.data.result[key].altname.indexOf('.') <= 0)
                      {
                        var val = { "symbolName" : [], "symbolPrice" :[] , "symbolOpen" :[], "symbolHigh" :[], "symbolLow" :[], "symbolClose" :[]};
                          val.symbolName = response.data.result[key].altname
                            var encodedTickerURI = window.encodeURI('http://localhost:8080/api/0/public/Ticker?pair=' + response.data.result[key].altname);
                            
                            axios
                                .get(encodedTickerURI)
                                .then(response => {
                                     val.symbolPrice = Object.entries(Object.entries(Object.entries(response.data.result)[0][1])[2][1])[0][1];
                                     val.symbolHigh = Object.entries(Object.entries(Object.entries(response.data.result)[0][1])[7][1])[0][1];
                                     val.symbolLow = Object.entries(Object.entries(Object.entries(response.data.result)[0][1])[6][1])[0][1];
                                     val.symbolClose = Object.entries(Object.entries(response.data.result)[0][1])[8][1];


                                     console.log(val.symbolPrice);
                            })
                                .catch((error) => {
                                    console.log("error",error)
                                })
                          
                          sval.val.push(val);
                      }         
                      });
                     
                    console.log('sval is', sval);   
                    this.setState({tickerSymbols:sval});
                })
                .catch((error) => {
                    console.log("error",error)
                })

      }



      render () {
        console.log('render data' , this.state.tickerSymbols);
        if(this.state.tickerSymbols!=undefined)
        {
        return (
            <form onSubmit={this.handleSubmit} >
            <div className="pricing_table_wdg">
            <ul value={this.state.tickerSelected} onChange={this.handleChange} >
              <li key='Price'> Symbol </li>
              {this.state.tickerSymbols.val.map(function(symbol) {
                return (<li key={symbol.symbolName}> {symbol.symbolName}  </li>);
              })}
            </ul>
  
            <ul value={this.state.tickerSelected} onChange={this.handleChange} >
              <li key='Price'> Current Price </li>
              {this.state.tickerSymbols.val.map(function(symbol) {
                return (<li key={symbol.symbolName}> {symbol.symbolPrice}  </li>);
              })}
            </ul>   

            <ul value={this.state.tickerSelected} onChange={this.handleChange} >
              <li key='Price'> High </li>
              {this.state.tickerSymbols.val.map(function(symbol) {
                return (<li key={symbol.symbolName}> {symbol.symbolHigh}  </li>);
              })}
            </ul>   

            <ul value={this.state.tickerSelected} onChange={this.handleChange} >
              <li key='Price'> Low </li>
              {this.state.tickerSymbols.val.map(function(symbol) {
                return (<li key={symbol.symbolName}> {symbol.symbolLow}  </li>);
              })}
            </ul>   

            <ul value={this.state.tickerSelected} onChange={this.handleChange} >
              <li key='Price'> Closing Price </li>
              {this.state.tickerSymbols.val.map(function(symbol) {
                return (<li key={symbol.symbolName}> {symbol.symbolClose}  </li>);
              })}
            </ul>   

            </div>
            <input type='submit' value="submit" />
            </form>
          ) 
        }
    
        else
        {
        return <div> No Value</div> 
        }
  }
}


    export default TickerMatrix