import axios from 'axios'

const searchRequest = (value) => {
  let reqObj = {
    value: value
  };

  return {
    type: 'SEARCH',
    url: axios.post('/api/twitter/search', reqObj);
  };
}

export default searchRequest