import React, { Component, PropTypes } from 'react'
import { Button, Card, Glyph, Form, FormField, FormInput } from 'elemental'
import { Firebase, FirebaseWrite, styles } from 'refire-app'
import url from '../../url'
import { replaceEmojis } from '../../utils'

class PostNewTopic extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      topic: "",
      text: ""
    }
    this.submit = this.submit.bind(this)
    this.updateField = this.updateField.bind(this)
  }

  submit(event) {
    event.preventDefault()
    const { user, boardId } = this.props
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
      [`users/${user.uid}/threads/${threadKey}`]: true,
      [`users/${user.uid}/posts/${postKey}`]: true
    }

    console.log( "SUBMITTING", update )
    this.props.submit(update)
    this.setState({ topic: "", text: "" })
  }

  updateField(field) {
    return (event) => {
      event.preventDefault()
      this.setState({ [field]: replaceEmojis(event.target.value) })
    }
  }

  render() {
    const { user, styles } = this.props
    const submitEnabled = this.state.topic && this.state.text
    if (!user) return <div />
    return (
      <Card>
        <div className={styles.userProfile}>
          <img className={styles.profileImage} src={user.profileImageURL} />
          <strong>{user.displayName}</strong>
        </div>
        <Form>
          <FormField>
            <FormInput placeholder="New topic" value={this.state.topic} onChange={this.updateField("topic")} />
          </FormField>
          <FormField>
            <FormInput placeholder="Text (markdown enabled)" value={this.state.text} multiline onChange={this.updateField("text")} />
          </FormField>
          <Button disabled={!submitEnabled} type="success" onClick={this.submit}><Glyph icon="plus" /> Post new topic</Button>
          <Button type="link"><Glyph icon="eye-watch" />Preview</Button>
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
