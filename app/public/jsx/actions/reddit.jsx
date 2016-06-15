import axios from 'axios'

const reddit = (text) => {

  return {
    type: 'POST_REDDIT',
    payload: axios.post('/_api/reddit/search', { "query": text })
  };
}

export default reddit