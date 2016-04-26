import { USER_AUTHENTICATED, USER_UNAUTHENTICATED } from 'refire-app'

export const userReducer = (state = null, action) => {
  const { payload } = action
  if (action.type === USER_AUTHENTICATED) {
    const { uid, provider, [provider]: { displayName, profileImageURL } } = payload
    return {
      uid,
      provider,
      displayName,
      profileImageURL,
    }
  } else if (action.type === USER_UNAUTHENTICATED) {
    return null
  } else {
    return state
  }
}
