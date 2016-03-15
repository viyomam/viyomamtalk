import refireApp, { Firebase } from 'refire-app'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { momentLocaleSetup } from './utils'
injectTapEventPlugin()
momentLocaleSetup()

// import elemental css
import '../node_modules/elemental/less/elemental.less'
// highlight.js
import '../node_modules/highlight.js/styles/default.css'
import './global.css'

import { userReducer } from './reducers'

import url from './url'
import bindings from './bindings'
import routes from './routes'

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
