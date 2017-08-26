
import React from 'react';

class TickerStand extends React.Component
{
    render()
    {
        
        const tickers = ['xbt', 'ltc', 'eth'];

        return(
            <div className='tickerStand'>
            {tickers.map(function(ticker){
                    return(
                    <div className='tickerStandItem' key={ticker} >{ticker}</div>
                    )
            })}
            </div>

        )

    }

}

module.exports = TickerStand;

