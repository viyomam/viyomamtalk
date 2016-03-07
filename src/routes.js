import React from 'react'
import { IndexRoute, Route } from 'refire-app'

import App from './components/App'
import Index from './components/Index'
import Board from './components/Board'
import Thread from './components/Thread'
import Profile from './components/Profile'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route path="board/:boardId" component={Board} />
    <Route path="board/:boardId/:threadId" component={Thread} />
    <Route path="profile/:uid" component={Profile} />
  </Route>
)
