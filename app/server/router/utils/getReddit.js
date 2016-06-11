let axios = require('axios');

const redditHandler = (req, res) => {
  let redditURL = `https://www.reddit.com/search.json?q=${req.body.query}`;
  getRedditSearch(redditURL, redditData => console.log(redditData));
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
        redditData.push({
          id: comments[i].data.id,
          comment: comments[i].data.body,
          score: comments[i].data.score,
        });
      }
      cb(redditData);
    })
    .catch(response => {
      console.log(`${response} Get request to Reddit post URL:${redditPostURL} unsuccessful`);
    });
}

exports.redditHandler = redditHandler;

// redditHandler({body: {"query": 'javascript'}}); Uncomment to make a get request to Reddit and see the redditData array
redditHandler({body: {"query": 'javascript'}});