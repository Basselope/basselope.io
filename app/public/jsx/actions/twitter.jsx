import axios from 'axios'

const twitter = (text) => {

  return {
    type: 'POST_TWEETS',
    payload: axios.post('/_api/twitter/search', { "query": text })
  };
}

export default twitter