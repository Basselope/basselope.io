import axios from 'axios'

export const FETCH_TWITTER = 'FETCH_TWITTER'

export const fetchTwitter = (text) => {
  const request = axios.post('/_api/twitter/search', { "query": text });

  return {
    type: FETCH_TWITTER,
    payload: request
  };
}