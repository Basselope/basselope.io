import axios from 'axios'

export const FETCH_REDDIT = 'FETCH_REDDIT'

export const fetchReddit = (text) => {
  const request = axios.post('/_api/reddit/search', { query: text });

  return {
    type: FETCH_REDDIT,
    payload: request
  };
}