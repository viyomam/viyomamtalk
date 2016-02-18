import React, { Component, PropTypes } from 'react'
import { Button, Card, Glyph, Form, FormField, FormInput } from 'elemental'
import { Firebase, FirebaseWrite, styles } from 'refire-app'
import url from '../../url'
import { replaceEmojis, quote } from '../../utils'

import PreviewButton from '../PreviewButton'
import PreviewFields from './PreviewFields'
import TextFields from './TextFields'

class ReplyToTopic extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      text: "",
      previewEnabled: false
    }
    this.submit = this.submit.bind(this)
    this.updateField = this.updateField.bind(this)
    this.togglePreview = this.togglePreview.bind(this)
    this.textInputRef = this.textInputRef.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.quote !== this.props.quote) {
      this.setState({
        text: quote(replaceEmojis(`${nextProps.quote}`))
      }, () => {
        if (this.textInput) {
          this.textInput.scrollTop = this.textInput.scrollHeight
          this.textInput.focus()
        }
      })
    }
  }

  submit(event) {
    event.preventDefault()
    const { user, threadKey, selectLastPage, submit, postKey: replyToId } = this.props
    const ref = new Firebase(url)
    const postKey = ref.child("posts").push().key()

    const update = {
      [`threads/${threadKey}/posts/${postKey}`]: true,
      [`threads/${threadKey}/lastPostAt`]: Firebase.ServerValue.TIMESTAMP,
      [`posts/${postKey}`]: {
        body: this.state.text,
        createdAt: Firebase.ServerValue.TIMESTAMP,
        threadId: threadKey,
        replyTo: replyToId,
        user: {
          displayName: user.displayName,
          image: user.profileImageURL,
          id: user.uid
        }
      },
      [`users/${user.uid}/posts/${postKey}`]: true
    }

    console.log( "SUBMITTING", update )
    submit(update)
    selectLastPage()
    this.setState({ text: "" })
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

  textInputRef(input) {
    this.textInput = input
  }

  render() {
    const { user, styles } = this.props
    const submitEnabled = !!this.state.text
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
            text={this.state.text}
            updateText={this.updateField("text")}
            inputRef={this.textInputRef} />
          <PreviewFields
            preview={this.state.previewEnabled}
            text={this.state.text} />
          <Button disabled={!submitEnabled} type="success" onClick={this.submit}>
            <Glyph icon="plus" /> Reply to topic
          </Button>
          <PreviewButton
            enabled={this.state.previewEnabled}
            togglePreview={this.togglePreview} />
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
}, FirebaseWrite({ method: "update" })(ReplyToTopic))
