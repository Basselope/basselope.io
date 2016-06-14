'use strict';

const _ = require('lodash');
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
  }),
  reddit: {
    request: (params) => {
      return axios.get('https://www.reddit.com/search.json', params)
        .then((res) => axios.all(res.data.data.children
          .slice(0,7).map((val) => axios.get(`https://www.reddit.com${val.data.permalink.split('?')[0]}.json`))))
        .then(axios.spread((...args) => args.reduce((curr, val) =>
            curr.concat(val.data.reduce((c,v) =>
              c.concat(v.data.children),[])),[])))
    }
  }
};

const data = {
  twitter: (res) => res.data.statuses,
  reddit: (res) => res
};

const q = {
  twitter: (query) => ({
    params: {
      q: query
    }
  }),
  reddit: (query, path) => ({
    params: {
      q: query
    }
  })
};

const fetch = (src, query) => {
  if(Array.isArray(query))
    return axios.all(query.map((val) => call[src].request(q[src](val))))
      .then(axios.spread((...res) => res.reduce((curr, val) => curr.concat(data[src](val)),[])))
      .then((data) => sentiment[src](Struct(data, src)));
  return call[src].request(q[src](query))
    .then((res) => sentiment[src](Struct(data[src](res), src)));
};


fetch('twitter', 'trump')
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
  fetch('reddit', 'trump')
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
module.exports = fetch;