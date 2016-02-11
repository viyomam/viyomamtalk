import React, { Component, PropTypes } from 'react'
import { bindings, Link } from 'refire-app'
import { Card } from 'elemental'
import moment from 'moment'

// TODO: load from firebase settings collection
const DATE_FORMAT = "DD.MM.YYYY"

class Profile extends Component {

  render() {
    const {value: profile = {}} = this.props.profile || {}
    const {value: posts = {}} = this.props.profilePosts || {}
    const {value: threads = {}} = this.props.profileThreads || {}

    console.log( "PROFILE", profile )
    console.log( "POSTS", posts )
    console.log( "THREADS", threads )

    return (
      <div className="Profile">
        <Card>
          <h2>{profile.displayName}</h2>
          <img src={profile.profileImageURL} />
          Member since {moment(profile.registeredAt, "x").format(DATE_FORMAT)}
          Threads started {threads.length}
          Posts {posts.length}
        </Card>
      </div>
    )
  }
}

export default bindings(["profile", "profilePosts", "profileThreads"])(Profile)
