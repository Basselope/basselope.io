import React, { PropTypes } from 'react'

const search = ({text}) => (
  <div>
    <h1>search bar here</h1>
    <div>{text}</div>
  </div>
)

search.propTypes = {
  text: PropTypes.string.isRequired
}

export default search