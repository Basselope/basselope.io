'use strict';

const axios = require('axios');
const Struct = require('./api_struct');


const call = {
  twitter: axios.create({
    method: 'get',
    url: 'https://api.twitter.com/1.1/search/tweets.json',
    transformResponse: [
      (data) => Struct(JSON.parse(data).statuses,'twitter')
    ],
    headers: {
      "User-Agent": "Coding Defined",
      "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAEYuvgAAAAAA4vc6W03bEZoNHsGmiJoYd10sOOw%3DvsyKWJjdYy1WLbp9KsCldB17b1Kzn4GPZcgJFGcGM6IDMTTrSr"
    },
    params: {
      count: 100,
      include_entities: true
    }
  })
  // reddit: axios.create({
  //   baseURL: 'https://www.reddit.com/search.json',
  //   timeout: 1500,
  //   headers: {
  //     token_type: 'bearer',
  //     access_token: 'AAAAAAAAAAAAAAAAAAAAAEYuvgAAAAAA4vc6W03bEZoNHsGmiJoYd10sOOw%3DvsyKWJjdYy1WLbp9KsCldB17b1Kzn4GPZcgJFGcGM6IDMTTrSr'
  //   },
  //   params: {
  //     count: 100,
  //     include_entities: true
  //   }
  // }),
};

const q = {
  twitter: (query) => ({
    q: query
  })
};

const fetch = (src, query) => {
  return call[src].request({ params: q[src](query) });
};


module.exports = fetch;
//testing:
// fetch('twitter', 'nodejs')
//   .then((res) => console.log(res.data))
//   .catch((err) => console.log(err));