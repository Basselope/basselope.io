// API data parsing structures
const _ = require('lodash');
const moment = require('moment');


const wiki_content_struct = (newsSource) => ({
  id: newsSource.title || "UNDEFINED",
  text: newsSource.title || "",
  vote_count: newsSource.favorites_count || 0,
  down_count: null,
  share_count: newsSource.retweet_count || 0,
  links: newsSource.urls || null,
  tags: newsSource.tags || null,
  mentions_to: null,
  responds_to: null,
  location:  null,
  created_at: newsSource.timestamp || null
})

const wiki_author_struct = (newsSource) => ({
  id: "wiki",
  img: newsSource.user || null,
  name: newsSource.name || null,
  handle:  null,
  status_count: null,
  follow_count:  null,
  listed_count:  null
});



const twitter_content_struct = (tweet) => ({
  id: tweet.id_str,
  text: tweet.text,

  vote_count: tweet.favorites_count || 0,
  down_count: null,
  share_count: tweet.retweet_count || 0,

  links: tweet.entities.urls.map((item) => item.url),
  tags: tweet.entities.hashtags.map((item) => item.text),
  mentions_to: tweet.entities.user_mentions.map((item) => item.id_str),
  responds_to: tweet.in_reply_to_user_id_str || null,

  location: tweet.coordinates || null,
  created_at: moment.utc(new Date(tweet.created_at)).toObject()
});

const twitter_account_struct = (tweet) => ({
  id: tweet.user.id_str,
  img: tweet.user.profile_image_url,
  name: tweet.user.screen_name,
  handle: tweet.user.screen_name,
  status_count: tweet.user.statuses_count,
  follow_count: tweet.user.followers_count,
  listed_count: tweet.user.listed_count
});

const reddit_account_struct = (post) => ({
  id: post.data.id,
  img: null,
  name: null,
  handle: post.data.author,
  status_count: null,
  follow_count: null,
  listed_count: null
});

const reddit_content_struct = (post) => ({
  id: post.data.name,
  text: post.data.selfText || post.data.body,

  vote_count: post.data.ups,
  down_count: post.data.downs,
  share_count: null,

  links: [`https://www.reddit.com${post.data.permalink}`],
  tags: [post.data.subreddit],
  mentions_to: null,
  responds_to: post.data.parent_id || null,

  location: null,
  created_at: moment.unix(new Date(post.data.created)).toObject()
});

const keygen = {
  twitter: (tweet) => tweet.user.id,
  reddit: (post) => post.data.id,
  wiki: (news) => HashString(news.title)
};

const Author = {
  twitter: twitter_account_struct,
  reddit: reddit_account_struct,
  wiki: wiki_author_struct
};
const Content = {
  twitter: twitter_content_struct,
  reddit: reddit_content_struct,
  wiki: wiki_content_struct

};

const Struct = (val, src) => {
  let author = {};
  author = Author[src](val);
  let content = {};
  content = [Content[src](val)];
  return {author,content};
};
const HashString = (hashText) =>{
  var hash = 0, i, chr, len;
  if (hashText.length === 0) return hash;
  for (i = 0, len = hashText.length; i < len; i++) {
    chr   = hashText.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; 
  }
  
  return hash;


}
module.exports = function(res, src) {
 return  _.reduce(res, function(curr, val) {
    if(keygen[src](val) in curr){
      curr[keygen[src](val)].content.push(Content[src](val));
    }
    else{
      curr[keygen[src](val)] = Struct(val, src);
    }
    return curr;
  }, {});
};
