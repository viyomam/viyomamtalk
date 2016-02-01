import React, { Component, PropTypes } from 'react'
import { bindings, routeActions, FirebaseOAuth, Link } from 'refire-app'
import { Button, Spinner } from 'elemental'

const style = {
  maxWidth: "980px",
  margin: "0 auto",
  padding: "0 20px"
}

const topBarContainerStyle = {
  position: "fixed",
  left: 0,
  right: 0,
  height: "50px"
}

const topbarStyle = {
  position: "relative",
  //background: "rgba(255, 255, 255, 0.95)",
  maxWidth: "940px",
  margin: "0 auto",
  height: "50px",
  padding: "7px 20px",
  background: "#fdfdfd",
  //borderLeft: "1px solid rgba(0, 0, 0, 0.17)",
  //boxShadow: "0 1px 0 rgba(0, 0, 0, 0.17)"
}

const headerStyle = {
  fontSize: "24px",
  display: "inline-block",
  margin: 0,
  paddingTop: "5px"
}

const bodyStyle = {
  paddingTop: "60px"
}

const buttonStyle = {
  position: "absolute",
  right: "20px"
}

const profileImageStyle = {
  position: "absolute",
  right: "20px",
  borderRadius: "20px",
  height: "40px",
  width: "40px"
}

const Authentication = ({ user }) => {
  if (user) {
    return (
      <img style={profileImageStyle} src={user.google.profileImageURL} />
    )
  } else {
    return (
      <FirebaseOAuth provider="google" flow="authWithOAuthPopup">
        <Button style={buttonStyle}>Login with Google</Button>
      </FirebaseOAuth>
    )
  }
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {  }
  }

  render() {
    const { _status: { connected, initialFetchDone, authenticatedUser } } = this.props
    const loading = !connected && !initialFetchDone

    if (loading) {
      return <Spinner size="lg" />
    }

    return (
      <div className="App">
        <div style={style}>
          <div style={topBarContainerStyle}>
            <div style={topbarStyle}>
              <h1 style={headerStyle}><Link to="/">refire</Link></h1>
              <Authentication user={authenticatedUser} />
            </div>
          </div>
          <div style={bodyStyle}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default bindings("_status", "user")(App)
