// API data parsing structures
const _ = require('lodash');

const twitter_content_struct = (tweet) => ({
  id: tweet.id_str,
  text: tweet.text,

  vote_count: tweet.favorites_count || 0,
  share_count: tweet.retweet_count || 0,

  links: tweet.entities.urls.map((item) => item.url),
  tags: tweet.entities.hashtags.map((item) => item.text),
  mentions_to: tweet.entities.user_mentions.map((item) => item.id_str),
  responds_to: tweet.in_reply_to_user_id_str || null,

  location: tweet.coordinates || null,
  created_at: tweet.created_at
});

const twitter_account_struct = (tweet) => ({
  id: tweet.user.id_str,
  img: tweet.user.profile_image_url,
  name: tweet.user.screen_name,
  handle: tweet.user.screen_name,
  status_count: tweet.user.statuses_count,
  friend_count: tweet.user.friends_count,
  listed_count: tweet.user.listed_count
});

const reddit_account_struct = (comment) => ({});

const reddit_content_struct = (comment) => ({});

const keygen = {
  twitter: (tweet) => tweet.user.id,
  reddit: (post) => post
};

const Author = {
  twitter: twitter_account_struct,
  reddit: reddit_account_struct
};
const Content = {
  twitter: twitter_content_struct,
  reddit: reddit_content_struct
};

const Struct = (val, src) => {
  let author = {};
  author = Author[src](val);
  let content = {};
  content = [Content[src](val)];
  return {author,content};
};

module.exports = function(res, src) {
  return _.reduce(res, function(curr, val) {
    if(keygen[src](val) in curr)
      curr[keygen[src](val)].content.push(Content[src](val));
    else
      curr[keygen[src](val)] = Struct(val, src);
    return curr;
  }, {});
};
