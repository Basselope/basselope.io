// API data parsing structures

const twitter_content_struct = (tweet) => ({
  id: tweet.id_str,
  text: tweet.text,
  urls: tweet.entities.urls || null,
  hashtags: tweet.entities.hashtags || null,
  mentions_to: tweet.entities.user_mentions || null,
  responds_to: tweet.in_reply_to_user_id_str || null,
  fav_count: tweet.favorites_count,
  ret_count: tweet.retweet_count,
  location: tweet.coordinates || null,
  created_at: tweet.created_at
});

const twitter_account_struct = (tweet) => ({
  id: tweet.user.id,
  img: tweet.user.profile_image_url || null,
  name: tweet.user.screen_name,
  handle: tweet.user.screen_name,
  status_count: tweet.user.statuses_count,
  friend_count: tweet.user.friends_count,
  listed_count: tweet.user.listed_count
});

const reddit_account_struct = (comment) => ({});

const reddit_content_struct = (comment) => ({});

const author_struct = (tweet) => ({
  author: {
    struct: {
      twitter: twitter_account_struct,
      reddit: reddit_account_struct,
    }
  },
  content: {
    struct: {
      twitter: twitter_content_struct,
      reddit: reddit_content_struct
    }
  }
});

module.exports = author_struct;