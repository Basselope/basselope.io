import { connect } from 'react-redux'
import TweetList from '../components/tweetList.jsx'

const getTweets = (tweets, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return tweets
    case 'SHOW_COMPLETED':
      return tweets.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return tweets.filter(t => !t.completed)
  }
}

const mapStateToProps = (state) => {
  return {
    tweets: getTweets(state.tweets, state.tweetsFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

const TweetListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TweetList)

export default TweetListContainer