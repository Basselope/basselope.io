import React, { PropTypes } from 'react'
// import TweetList from './TweetList'

const TweetList = ({ todos, onTodoClick }) => (
  <ul>

  </ul>
)

// TweetList.propTypes = {
//   todos: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     completed: PropTypes.bool.isRequired,
//     text: PropTypes.string.isRequired
//   }).isRequired).isRequired,
//   onTodoClick: PropTypes.func.isRequired
// }

export default TweetList

// {todos.map(todo =>
// <TweetList
// key={todo.id}
// {...todo}
// onClick={() => onTodoClick(todo.id)}
// />
// )}