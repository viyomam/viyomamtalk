import React, { Component, PropTypes } from 'react'
import { bindings } from 'refire-app'
import { Button, Row, Col, Card, Spinner } from 'elemental'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'

import ReplyToTopic from './ReplyToTopic'

const imageStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "20px",
  marginTop: "10px",
}

const spinnerContainerStyle = {
  padding: "30px 0",
}

const headerStyle = {
  minHeight: "28px",
  margin: "0.2em 0 1em 0"
}

const profileContainerStyle = {
  position: "relative",
  textAlign: "center"
}

const bodyContainerStyle = {
  margin: "0 0 10px 0"
}

const Post = ({ post }) => {
  return (
    <Row>
      <Col xs="2/12" sm="1/8" lg="1/12">
        <div style={profileContainerStyle}>


          <img src={post.user.image} style={imageStyle} />
        </div>
      </Col>
      <Col xs="10/12" sm="7/8" lg="11/12">
        <Card>
          <div style={bodyContainerStyle}>
            <ReactMarkdown source={post.body} />
          </div>
          <strong>{post.user.displayName}</strong> {moment(post.createdAt, "x").format("DD.MM.YYYY HH:mm")}
        </Card>
      </Col>
    </Row>
  )
}

const Posts = ({ posts }) => {
  if (!posts.length) {
    return <div style={spinnerContainerStyle}><Spinner /></div>
  } else {
    return (
      <div>
        {
          posts.map(({ key, value: post}) => <Post key={key} post={post} />)
        }
      </div>
    )
  }
}

class Thread extends Component {
  render() {
    const {key: threadKey, value: thread = {}} = this.props.thread || {}
    const {value: posts = []} = this.props.threadPosts || {}
    const { authenticatedUser: user } = this.props

    return (
      <div>
        <Card>
          <h2 style={headerStyle}>{thread.title}</h2>
          <Posts posts={posts} />
        </Card>
        <ReplyToTopic user={user} threadKey={threadKey} />
      </div>
    )
  }
}

export default bindings(["thread", "threadPosts"], ["authenticatedUser"])(Thread)
