import axios from 'axios'

export const FETCH_ALCHEMY = 'FETCH_ALCHEMY'

export const fetchAlchemy = (text) => {
  const request = axios.post('/_api/alchemy/search', { query: text });

  return {
    type: FETCH_ALCHEMY,
    payload: request
  };
}