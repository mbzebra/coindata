import React          from 'react';
import Header         from './Header';
import TickerMatrix  from './TickerMatrix';

class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <Header />
        <TickerMatrix />
      </div>
    )
  }
}

module.exports = App; 
