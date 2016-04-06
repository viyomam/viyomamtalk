import React from 'react'
import { IndexRoute, Route } from 'refire-app'

import App from './components/App/App'
import Index from './components/Categories/Index'
import Board from './components/Board/Board'
import Thread from './components/Thread/Thread'
import Profile from './components/Profile/Profile'
import NativeLogin from './components/NativeLogin/NativeLogin'

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
