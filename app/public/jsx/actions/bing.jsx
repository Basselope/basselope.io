import axios from 'axios'

export const FETCH_BING = 'FETCH_BING'

export const fetchBing = (text) => {
  const data = axios.post('/_api/bing/search', { "query": text });
  return {
    type: FETCH_BING,
    payload: data
  };
}