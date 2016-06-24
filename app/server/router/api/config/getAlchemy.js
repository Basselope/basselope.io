const api = require('./api.js');
const axios = require('axios');

module.exports = function getAlchemy(req, res) {
  let alchemyData = [];
  return axios.get(`https://gateway-a.watsonplatform.net/calls/data/GetNews?apikey=${api.alchemy}&outputMode=json&start=now-3h&end=now&count=2&return=enriched.url.title,enriched.url.url,enriched.url.text&q.enriched.url.title=${req.body.query}`)
    .then(response => {
      response.data.result.docs.forEach((doc => {
      alchemyData.push({
        title: doc.source.enriched.url.title,
        url: doc.source.enriched.url.url,
        date: doc.timestamp,
        text: doc.source.enriched.url.text})
      }))})
    .then(response => alchemyData)
    .catch(response => console.log(response));
}

// getAlchemy({body:{query:'trump'}})