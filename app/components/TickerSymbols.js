import React, { Component } from 'react'
import axios                from 'axios';
import TickerPrice          from './TickerPrice';

  class TickerSymbols extends Component {

      constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.state = {tickerSymbols: ''}
        this.state = {tickerSelected : ''}
      }

      handleChange(event)
      {
        this.setState({tickerSelected: event.target.value});
        
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
                        var val = { "symbolName" : [], "symbolPrice" :[]};
                          val.symbolName = response.data.result[key].altname
                            var encodedTickerURI = window.encodeURI('http://localhost:8080/api/0/public/OHLC?pair=' + response.data.result[key].altname);
                            
                            axios 
                                .get(encodedTickerURI)
                                .then(response => {
                                     val.symbolPrice = Object.entries(Object.entries(Object.entries(response.data.result)[0][1])[0][1])[0][1];
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
            <div>
            <select value={this.state.tickerSelected} onChange={this.handleChange}>
              {this.state.tickerSymbols.val.map(function(symbol) {
                return (<option key={symbol.symbolName}> {symbol.symbolName} | {symbol.symbolPrice}  </option>);
              })}
            </select>
            </div> 
          ) 
        }
    
        else
        {
        return <div> No Value</div> 
        }
  }
}


    export default TickerSymbols