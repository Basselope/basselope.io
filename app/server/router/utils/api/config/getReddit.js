let axios = require('axios');
//let sentimentAnalysis = require('./../../../data/utils/sentimentAnalysis.js');

const redditHandler = (req, res) => {
  let redditURL = `https://www.reddit.com/search.json?q=${req.body.query}`;
  getRedditSearch(redditURL, redditData => res.status(200).send(redditData));
}

const getRedditSearch = (redditURL, cb) => {
  let redditData = [];
  axios.get(redditURL)
    .then(response => {
      for (let i = 0; i < 4; i++) {
        let redditPostURL = `${response.data.data.children[i].data.url}/.json`;
        getRedditComments(redditPostURL, redditData, cb);
      }
    })
    .catch(response => {
      console.log(`${response} Get request to Reddit search URL:${redditURL} unsuccessful`);
    });
}

const getRedditComments = (redditPostURL, redditData, cb) => {
  axios.get(redditPostURL)
    .then(post => {
      let comments = post.data[1].data.children;
      for (let i = 0; i < comments.length; i++) {
        console.log(comments[i]);
        redditData.push({
          id: comments[i].data.id,
          comment: comments[i].data.body,
          score: comments[i].data.score,
        });
      }
      //HERE
      //let analyzedReddits = sentimentAnalysis.sentimentProps.runTwit(tweetsReturn)
      cb(redditData);
    })
    .catch(response => {
      console.log(`${response} Get request to Reddit post URL:${redditPostURL} unsuccessful`);
    });
}

module.exports.redditHandler = redditHandler;

// redditHandler({body: {"query": 'javascript'}}); Uncomment to make a get request to Reddit and see the redditData array
//redditHandler({body: {"query": 'javascript'}});