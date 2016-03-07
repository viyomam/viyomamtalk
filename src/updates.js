import { Firebase } from 'refire-app'
import url from './url'

export function newThread({ boardId, topic, text, user }) {
  const ref = new Firebase(url)
  const threadKey = ref.child("threads").push().key()
  const postKey = ref.child("posts").push().key()

  return {
    [`boards/${boardId}/threads/${threadKey}`]: true,
    [`threads/${threadKey}`]: {
      title: topic,
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
      body: text,
      createdAt: Firebase.ServerValue.TIMESTAMP,
      threadId: threadKey,
      user: {
        displayName: user.displayName,
        image: user.profileImageURL,
        id: user.uid
      }
    },
    [`users/${user.uid}/threadsStarted/${threadKey}`]: true,
    [`users/${user.uid}/posts/${postKey}`]: true
  }
}

export function deleteThread({ threadKey, thread }) {
  const posts = Object.keys(thread.posts).reduce((paths, postId) => {
    return {
      ...paths,
      [`posts/${postId}`]: null,
      [`users/${thread.user.id}/posts/${postId}`]: null
    }
  }, {})

  return {
    ...posts,
    [`threads/${threadKey}`]: null,
    [`boards/${thread.boardId}/threads/${threadKey}`]: null,
    [`users/${thread.user.id}/threadsStarted/${threadKey}`]: null
  }
}

export function toggleThreadLocked({ threadKey, thread }) {
  return {
    [`threads/${threadKey}/locked`]: !thread.locked
  }
}

export function replyToThread({ threadKey, text, replyToId, user }) {
  const ref = new Firebase(url)
  const postKey = ref.child("posts").push().key()

  return {
    [`threads/${threadKey}/posts/${postKey}`]: true,
    [`threads/${threadKey}/lastPostAt`]: Firebase.ServerValue.TIMESTAMP,
    [`posts/${postKey}`]: {
      body: text,
      createdAt: Firebase.ServerValue.TIMESTAMP,
      threadId: threadKey,
      replyTo: replyToId,
      user: {
        displayName: user.displayName,
        image: user.profileImageURL,
        id: user.uid
      }
    },
    [`users/${user.uid}/posts/${postKey}`]: true
  }
}

export function deletePost({ postKey, post }) {
  return {
    [`threads/${post.threadId}/posts/${postKey}`]: null,
    [`posts/${postKey}`]: null,
    [`users/${post.user.id}/posts/${postKey}`]: null
  }
}
