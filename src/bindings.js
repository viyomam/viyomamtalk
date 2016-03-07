export default {
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
  "profileThreadsStarted": {
    populate: (key) => `threads/${key}`,
    query: (ref) => ref.orderByKey().limitToLast(10),
    path: (state) => {
      if (state.routing.params.uid) {
        return `users/${state.routing.params.uid}/threadsStarted`
      } else {
        return null
      }
    }
  },
  "adminUsers": {
    type: "Array",
    path: (state) => {
      if (state.firebase.authenticatedUser) {
        return "adminUsers"
      } else {
        return null
      }
    }
  },
  "settings": {
    path: "settings"
  }
}
