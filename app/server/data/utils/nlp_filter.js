'use strict';

const nlp = reuquire('nlp_compromise');
const _ = require('lodash')

nlp.plugin(require('simple_english'));
nlp.plugin(require('nlp-locale'));

const twitter_user = (tweet) => ({
  id: tweet.user.id,
  img: tweet.user.profile_image_url || null,
  name: tweet.user.screen_name,
  handle: tweet.user.screen_name,
  status_count: tweet.user.statuses_count,
  friend_count: tweet.user.friends_count,
  listed_count: tweet.user.listed_count
});

const twitter_author_struct = (user, src) => ({
  author: {
    twitter: {
      id: tweet.user.id,
      img: tweet.user.profile_image_url || null,
      name: tweet.user.screen_name,
      handle: tweet.user.screen_name,
      status_count: tweet.user.statuses_count,
      friend_count: tweet.user.friends_count,
      listed_count: tweet.user.listed_count,
    }
  },
  content: {
    twitter: [],
    reddit: [],
  }
});

// {
//   id: tweet.id_str,
//     text: tweet.text,
//   urls: tweet.entities.urls || null,
//   hashtags: tweet.entities.hashtags || null,
//   mentions_to: tweet.entities.user_mentions || null,
//   responds_to: tweet.in_reply_to_user_id_str || null,
//   fav_count: tweet.favorites_count,
//   ret_count: tweet.retweet_count,
//   location: tweet.coordinates,
//   created_at: tweet.created_at
// }