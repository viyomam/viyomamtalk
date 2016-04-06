import React from 'react'
import { IndexRoute, Route } from 'refire-app'

import App from './App/App'
import Index from './Categories/Index'
import Board from './Board/Board'
import Thread from './Thread/Thread'
import Profile from './Profile/Profile'
import NativeLogin from './NativeLogin/NativeLogin'

export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="board/:boardId" component={Board} />
      <Route path="board/:boardId/:threadId" component={Thread} />
      <Route path="profile/:uid" component={Profile} />
    </Route>
    <Route path="native-login" component={NativeLogin} />
  </Route>
)
