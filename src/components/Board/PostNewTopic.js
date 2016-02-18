import React, { Component, PropTypes } from 'react'
import { Button, Card, Glyph, Form, FormField, FormInput } from 'elemental'
import { Firebase, FirebaseWrite, styles } from 'refire-app'

import url from '../../url'
import { replaceEmojis } from '../../utils'

import PreviewButton from '../PreviewButton'
import PreviewFields from './PreviewFields'
import TextFields from './TextFields'

class PostNewTopic extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      topic: "",
      text: "",
      previewEnabled: false
    }
    this.submit = this.submit.bind(this)
    this.updateField = this.updateField.bind(this)
    this.togglePreview = this.togglePreview.bind(this)
  }

  submit(event) {
    event.preventDefault()
    const { user, boardId, submit, showNewThreads } = this.props
    const ref = new Firebase(url)
    const threadKey = ref.child("threads").push().key()
    const postKey = ref.child("posts").push().key()

    const update = {
      [`boards/${boardId}/threads/${threadKey}`]: true,
      [`threads/${threadKey}`]: {
        title: this.state.topic,
        boardId: boardId,
        createdAt: Firebase.ServerValue.TIMESTAMP,
        lastPostAt: Firebase.ServerValue.TIMESTAMP,
        user: {
          displayName: user.displayName,
          image: user.profileImageURL,
          id: user.uid
        },
        posts: {
          [postKey]: true
        }
      },
      [`posts/${postKey}`]: {
        body: this.state.text,
        createdAt: Firebase.ServerValue.TIMESTAMP,
        threadId: threadKey,
        user: {
          displayName: user.displayName,
          image: user.profileImageURL,
          id: user.uid
        }
      },
      [`users/${user.uid}/threadsStarted/${threadKey}`]: true,
      [`users/${user.uid}/posts/${postKey}`]: true
    }

    console.log( "SUBMITTING", update )
    submit(update).then(() => {
      showNewThreads()
    })
    this.setState({ topic: "", text: "" })
  }

  updateField(field) {
    return (event) => {
      event.preventDefault()
      this.setState({ [field]: replaceEmojis(event.target.value) })
    }
  }

  togglePreview() {
    this.setState({ previewEnabled: !this.state.previewEnabled })
  }

  render() {
    const { user, styles, inputRef } = this.props
    const submitEnabled = this.state.topic && this.state.text
    if (!user) return <div />
    return (
      <Card>
        <div className={styles.userProfile}>
          <img className={styles.profileImage} src={user.profileImageURL} />
          <strong>{user.displayName}</strong>
        </div>
        <Form>
          <TextFields
            preview={this.state.previewEnabled}
            inputRef={inputRef}
            topic={this.state.topic}
            text={this.state.text}
            updateTopic={this.updateField("topic")}
            updateText={this.updateField("text")} />
          <PreviewFields
            preview={this.state.previewEnabled}
            topic={this.state.topic}
            text={this.state.text} />
          <Button disabled={!submitEnabled} type="success" onClick={this.submit}>
            <Glyph icon="plus" /> Post new topic
          </Button>
          <PreviewButton enabled={this.state.previewEnabled} togglePreview={this.togglePreview} />
        </Form>
      </Card>
    )
  }
}

export default styles({
  userProfile: {
    margin: "0 0 10px 0"
  },
  profileImage: {
    borderRadius: "20px",
    height: "40px",
    width: "40px",
    margin: "0 10px 0 0"
  }
}, FirebaseWrite({ method: "update" })(PostNewTopic))
