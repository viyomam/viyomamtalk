import React from 'react'
import refireApp, { IndexRoute, Route, Firebase } from 'refire-app'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// import elemental css
import '../node_modules/elemental/less/elemental.less'
import './global.css'

import App from './components/App'
import Index from './components/Index'
import Board from './components/Board'
import Thread from './components/Thread'
import Profile from './components/Profile'

import url from './url'
import { userReducer } from './reducers'

const bindings = {
  "categories": {
    type: "Array",
    query: (ref) => ref.orderByChild("active").equalTo(true),
    path: "categories"
  },
  "boards": {
    type: "Array",
    query: (ref) => ref.orderByChild("active").equalTo(true),
    path: "boards"
  },
  "board": {
    type: "Object",
    path: (state) => {
      if (state.routing.params.boardId) {
        return `boards/${state.routing.params.boardId}`
      } else {
        return null
      }
    }
  },
  "boardThreads": {
    populate: (key) => `threads/${key}`,
    path: (state) => {
      if (state.routing.params.boardId) {
        return `boards/${state.routing.params.boardId}/threads`
      } else {
        return null
      }
    }
  },
  "thread": {
    type: "Object",
    path: (state) => {
      if (state.routing.params.threadId) {
        return `threads/${state.routing.params.threadId}`
      } else {
        return null
      }
    }
  },
  "threadPosts": {
    populate: (key) => `posts/${key}`,
    path: (state) => {
      if (state.routing.params.threadId) {
        return `threads/${state.routing.params.threadId}/posts`
      } else {
        return null
      }
    }
  },
  "user": {
    type: "Object",
    path: (state) => {
      if (state.firebase.authenticatedUser) {
        return `users/${state.firebase.authenticatedUser.uid}`
      } else {
        return null
      }
    }
  },
  "profile": {
    type: "Object",
    path: (state) => {
      if (state.routing.params.uid) {
        return `users/${state.routing.params.uid}`
      } else {
        return null
      }
    }
  },
  "profilePosts": {
    populate: (key) => `posts/${key}`,
    path: (state) => {
      if (state.routing.params.uid) {
        return `users/${state.routing.params.uid}/posts`
      } else {
        return null
      }
    }
  },
  "profileThreads": {
    populate: (key) => `threads/${key}`,
    path: (state) => {
      if (state.routing.params.uid) {
        return `users/${state.routing.params.uid}/threads`
      } else {
        return null
      }
    }
  }
}

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route path="board/:boardId" component={Board} />
    <Route path="board/:boardId/:threadId" component={Thread} />
    <Route path="profile/:uid" component={Profile} />
  </Route>
)

refireApp({ url, bindings, routes, reducers: { authenticatedUser: userReducer } })

// update users/:uid with latest user data after successful authentication
const ref = new Firebase(url)
ref.onAuth((authData) => {
  if (authData && authData.uid) {
    const { uid, provider, [provider]: { displayName, profileImageURL } } = authData
    ref.child(`users/${authData.uid}`).update({
      provider,
      displayName,
      profileImageURL,
      lastLoginAt: Firebase.ServerValue.TIMESTAMP
    })
    // set registeredAt to current timestamp if this is the first login
    ref.child(`users/${authData.uid}/registeredAt`).transaction((registeredAt) => {
      if (!registeredAt) {
        return Firebase.ServerValue.TIMESTAMP
      }
    })
  }
})
