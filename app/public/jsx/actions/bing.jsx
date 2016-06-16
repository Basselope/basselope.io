import axios from 'axios'

export const FETCH_BING = 'FETCH_BING'

export const fetchBing = (text) => {
  const request = axios.post('/_api/bing/search', { "query": text });

  return {
    type: FETCH_BING,
    payload: request
  };
}