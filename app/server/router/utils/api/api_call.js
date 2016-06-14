'use strict';

const axios = require('axios');
const Struct = require('./api_struct');
const sentiment = require('./../../../data/utils/sentimentAnalysis.js');



const call = {
  twitter: axios.create({
    method: 'get',
    url: 'https://api.twitter.com/1.1/search/tweets.json',
    headers: {
      "User-Agent": "Coding Defined",
      "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAEYuvgAAAAAA4vc6W03bEZoNHsGmiJoYd10sOOw%3DvsyKWJjdYy1WLbp9KsCldB17b1Kzn4GPZcgJFGcGM6IDMTTrSr"
    },
    params: {
      count: 100,
      include_entities: true
    }
  })
};

const data = {
  twitter: (res) => res.data.statuses
};

const q = {
  twitter: (query) => ({
    q: query
  })
};

const fetch = (src, query) => {
  if(Array.isArray(query))
    return axios.all(query.map((val) => call[src].request({ params: q[src](val) })))
      .then(axios.spread((...res) => res.reduce((curr, val) => curr.concat(data[src](val)),[])))
      .then((data) => sentiment[src](Struct(data, src)));
  return call[src].request({ params: q[src](query) });
};


module.exports = fetch;
// testing:
// fetch('twitter', ['nodejs','#nodejs'])
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));