import React, { Component, PropTypes } from 'react'
import { bindings, Link, styles } from 'refire-app'
import { Button, Row, Col, Card, Pagination, Glyph } from 'elemental'

import drop from 'lodash/array/drop'
import take from 'lodash/array/take'

import ReplyToTopic from './Thread/ReplyToTopic'
import Post from './Thread/Post'
import Posts from './Thread/Posts'
import ShowPagination from './Thread/ShowPagination'

// TODO: load from firebase settings collection
const PAGE_SIZE = 5
const PAGE_LIMIT = 5

class Thread extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      currentPage: 1,
      quote: null
    }
    this.handlePageSelect = this.handlePageSelect.bind(this)
    this.updateQuote = this.updateQuote.bind(this)
  }

  handlePageSelect(page) {
    window.scrollTo(0, 0)
    this.setState({ currentPage: page })
  }

  updateQuote(text) {
    this.setState({ quote: text })
  }

  render() {
    const { key: threadKey, value: thread = {} } = this.props.thread || {}
    const { value: posts = [] } = this.props.threadPosts || {}
    const { authenticatedUser: user, styles } = this.props

    const pagedPosts = take(drop(posts, (this.state.currentPage - 1) * PAGE_SIZE), PAGE_SIZE)

    return (
      <div>
        <Card>
          <div className={styles.paginationContainer}>
            <h2 className={styles.header}>
              {thread.title}
            </h2>
            <ShowPagination
              currentPage={this.state.currentPage}
              handlePageSelect={this.handlePageSelect}
              posts={posts} />
          </div>
          <Posts posts={pagedPosts} updateQuote={this.updateQuote} user={user} />
          <div className={styles.paginationContainer}>
            <ShowPagination
              currentPage={this.state.currentPage}
              handlePageSelect={this.handlePageSelect}
              posts={posts} />
          </div>
        </Card>

        <ReplyToTopic
          user={user}
          threadKey={threadKey}
          quote={this.state.quote}
          updateQuote={this.updateQuote} />
      </div>
    )
  }
}

export default styles({
  header: {
    minHeight: "28px",
    margin: "0em 0 1em 0",
    //display: "inline-block"
  },
  paginationContainer: {
    position: "relative",
    minHeight: "32px"
  }
}, bindings(["thread", "threadPosts"], ["authenticatedUser"])(Thread))
