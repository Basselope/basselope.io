'use strict';

const _ = require('lodash');
const axios = require('axios');
const Struct = require('./api_struct');
const sentiment = require('./../../data/utils/sentimentAnalysis.js');
const api = require('./config/api.js');


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
      result_type: 'popular',
      include_entities: true
    }
  }),
  reddit: {
    request: (params) => {
      return axios.get('https://www.reddit.com/search.json', params)
        .then((res) => axios.all(res.data.data.children
          .slice(0,10).map((val) => axios.get(`https://www.reddit.com${val.data.permalink.split('?')[0]}.json`))))
        .then(axios.spread((...args) => args.reduce((curr, val) =>
            curr.concat(val.data.reduce((c,v) =>
              c.concat(v.data.children),[])),[])))
    }
  },
  alchemy: {
    request: (req) => {
      return axios.get(`https://gateway-a.watsonplatform.net/calls/data/GetNews?apikey=${api.alchemy}&outputMode=json&start=now-7d&end=now&count=3&return=enriched.url.title,enriched.url.url,enriched.url.text,enriched.url.image&q.enriched.url.title=${req.body.query}`)
      .then(response => {
        let alchemyData = [];
        response.data.result.docs.forEach(doc =>
          alchemyData.push({
            title: doc.source.enriched.url.title,
            url: doc.source.enriched.url.url,
            text: doc.source.enriched.url.text})
          );
      })
      .then(response => alchemyData)
      .catch(response => console.log(response));
      }
    },
    
 wiki: axios.create({
    method: 'get',
    url: 'https://en.wikinews.org/w/api.php',
    params: {
      action: "query",
      list:"search",
      srlimit: 50,
      format:"json", 
      srwhat:"text",
      srprop:"timestamp%7Csnippet%7Cwordcount%7Credirectsnippet",
      continue:""
    }
  }),
  wikitemp: {
    request: (params) => { //FIX ME

       
       return axios.get("https://en.wikinews.org/w/api.php", params )
        .then(function(response){


          //res.send(response.data)
            // ex.: { user: 'Your User'}

          return response;
         // ex.: 200
        });  
      }
    }
  };


const data = {
  twitter: (res) => res.data.statuses,
  reddit: (res) => res,
  alchemy: (res) => res,
  wiki: (res) => res.data.query.search
};

const q = {
  twitter: (query) => ({
    params: {
      q: query
    }
  }),
  reddit: (query, path) => ({
    params: {
      q: query,
      sort: 'hot'
    }
  }),
  wiki: (query) => ({
    params: {
      srsearch: query
    }
  }),
  alchemy: (query,path) => ({
    params: {
      q: query
    }
  })
};

const fetch = (src, query) => {

  if(Array.isArray(query))
    return axios.all(query.map((val) => call[src].request(q[src](val)))) //TODO REVIEW SPREAD
      .then(axios.spread((...res) => res.reduce((curr, val) => curr.concat(data[src](val)),[])))
      .then((data) => sentiment[src](Struct(data, src), query))
  return call[src].request(q[src](query))
    .then((res) => sentiment[src](Struct(data[src](res), src), query))
};


  //
  // fetch('reddit', 'trump')
  // .then((res) => console.log(res))
  // .catch((err) => console.log(err));
module.exports = fetch;