import React, { Component, PropTypes } from 'react'
import { Button, Card, Glyph, Form, FormField, FormInput } from 'elemental'
import { Firebase, FirebaseWrite } from 'refire-app'
import url from '../url'

const userProfileStyle = {
  margin: "0 0 10px 0"
}

const profileImageStyle = {
  borderRadius: "20px",
  height: "40px",
  width: "40px",
  margin: "0 10px 0 0"
}

class ReplyToTopic extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      text: ""
    }
    this.submit = this.submit.bind(this)
    this.updateField = this.updateField.bind(this)
  }

  submit(event) {
    event.preventDefault()
    const { user, threadKey } = this.props
    const ref = new Firebase(url)
    const postKey = ref.child("posts").push().key()

    const update = {
      [`threads/${threadKey}/posts/${postKey}`]: true,
      [`threads/${threadKey}/lastPostAt`]: Firebase.ServerValue.TIMESTAMP,
      [`posts/${postKey}`]: {
        body: this.state.text,
        createdAt: Firebase.ServerValue.TIMESTAMP,
        threadId: threadKey,
        user: {
          displayName: user.google.displayName,
          image: user.google.profileImageURL,
          id: user.uid
        }
      },
      [`users/${user.uid}/posts/${postKey}`]: true
    }

    console.log( "SUBMITTING", update )
    this.props.submit(update)
    this.setState({ text: "" })
  }

  updateField(field) {
    return (event) => {
      event.preventDefault()
      this.setState({ [field]: event.target.value })
    }
  }

  render() {
    const { user } = this.props
    const submitEnabled = !!this.state.text
    return (
      <Card>
        <div style={userProfileStyle}>
          <img style={profileImageStyle} src={user.google.profileImageURL} />
          <strong>{user.google.displayName}</strong>
        </div>
        <Form>
          <FormField>
            <FormInput placeholder="Text (markdown enabled)" value={this.state.text} multiline onChange={this.updateField("text")} />
          </FormField>
          <Button disabled={!submitEnabled} type="success" onClick={this.submit}><Glyph icon="plus" /> Reply to topic</Button>
          <Button type="link"><Glyph icon="eye-watch" />Preview</Button>
        </Form>
      </Card>
    )
  }
}

export default FirebaseWrite({
  method: "update"
})(ReplyToTopic)
