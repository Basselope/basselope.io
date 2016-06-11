import axios from 'axios'

const twitter = (text) => {

  return {
    type: 'GET_TWEETS',
    url: axios.post('/_api/twitter/search', { "query": text })
  };
}

export default twitter