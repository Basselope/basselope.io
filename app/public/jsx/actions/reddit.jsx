import axios from 'axios'

const reddit = (text) => {

  return {
    type: 'GET_REDDIT',
    url: axios.post('/_api/reddit/search', { "query": text })
  };
}

export default reddit