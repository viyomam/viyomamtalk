import React, { Component, PropTypes } from 'react'
import { Button, Card, Glyph, Form, FormField, FormInput } from 'elemental'
import { Firebase, FirebaseWrite, styles } from 'refire-app'
import url from '../../url'
import { replaceEmojis, quote } from '../../utils'

class ReplyToTopic extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      text: ""
    }
    this.submit = this.submit.bind(this)
    this.updateField = this.updateField.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.quote !== this.props.quote) {
      this.setState({
        text: quote(replaceEmojis(`${nextProps.quote}`))
      }, () => {
        if (this.refs.input) {
          this.refs.input.scrollTop = this.refs.input.scrollHeight
          this.refs.input.focus()
        }
      })
    }
  }

  submit(event) {
    event.preventDefault()
    const { user, threadKey, selectLastPage, submit } = this.props
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
          <FormField>
            <FormInput
              placeholder="Text (markdown enabled)"
              value={this.state.text}
              multiline
              onChange={this.updateField("text")}
              ref="input" />
          </FormField>
          <Button disabled={!submitEnabled} type="success" onClick={this.submit}>
            <Glyph icon="plus" /> Reply to topic
          </Button>
          <Button type="link">
            <Glyph icon="eye-watch" />Preview
          </Button>
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
