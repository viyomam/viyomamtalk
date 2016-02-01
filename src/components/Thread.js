import React, { Component, PropTypes } from 'react'
import { bindings } from 'refire-app'
import { Button, Row, Col, Card } from 'elemental'

class Thread extends Component {
  render() {
    const {key: threadId, value: thread = []} = this.props.thread || {}
    const {value: threadPosts = []} = this.props.threadPosts || {}

    return (
      <div>
        <h2>{thread.title}</h2>
        {
          threadPosts.map(({ key, value: post}) => {
            return (
              <Card key={key}>

                  <div key={key}>
                    {post.body}
                  </div>

              </Card>
            )
          })
        }
      </div>
    )
  }
}

export default bindings("thread", "threadPosts")(Thread)
