import React, { Component, PropTypes } from 'react'
import { bindings } from 'refire-app'
import { Button, Row, Col, Card, Spinner } from 'elemental'
import moment from 'moment'

import ReplyToTopic from './ReplyToTopic'

const imageStyle = {
  width: "40px",
  height: "40px"
}

const Posts = ({ posts }) => {
  if (!posts.length) {
    return <div><Spinner /></div>
  } else {
    return (
      <div>
        {
          posts.map(({ key, value: post}) => {
            return (
              <Row key={key}>
                <Col xs="1/6">
                  {moment(post.createdAt, "x").format("DD.MM.YYYY HH:mm")}
                  <strong>{post.user.displayName}</strong>
                  <img src={post.user.image} style={imageStyle} />
                </Col>
                <Col xs="5/6" key={key}>
                  <Card key={key}>{post.body}</Card>
                </Col>
              </Row>
            )
          })
        }
      </div>
    )
  }
}

class Thread extends Component {
  render() {
    const {key: threadKey, value: thread = []} = this.props.thread || {}
    const {value: posts = []} = this.props.threadPosts || {}
    const { authenticatedUser: user } = this.props._status

    return (
      <div>
        <Card>
          <h2>{thread.title}</h2>
          <Posts posts={posts} />
        </Card>
        <ReplyToTopic user={user} threadKey={threadKey} />
      </div>
    )
  }
}

export default bindings("thread", "threadPosts", "_status")(Thread)
