import axios from 'axios'

export const FETCH_WIKIPEDIA = 'FETCH_WIKIPEDIA'

export const fetchWikipedia = (text) => {
  const request = axios.post('/_api/wiki/search', { query: text });

  return {
    type: FETCH_WIKIPEDIA,
    payload: request
  };
}