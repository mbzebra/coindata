var axios = require('axios');

var axios2 = require('axios');

module.exports = {
  fetchTradeableAssetPairs: function (language) {
    var encodedURI = window.encodeURI('http://localhost:8080/api/0/public/AssetPairs');

    return axios.get(encodedURI)
      .then(function (response) {
        console.log(response.data.result);
        return response.data.result;
      });
  },

    fetchTickerForPair: function (pair) {
    var encodedURI = window.encodeURI('http://localhost:8080/api/0/public/Ticker?pair=' + pair);

    return axios2.get(encodedURI)
      .then(function (response) {
        console.log("result now is" , response.data.result);
        return response.data.result;
      });
  }


};