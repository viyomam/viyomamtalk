import React, { Component, PropTypes } from 'react'
import { FirebaseWrite, bindings, Link, styles, routeActions } from 'refire-app'
import { Card } from 'elemental'
import LockIcon from 'react-icons/lib/fa/lock'

import drop from 'lodash/array/drop'
import take from 'lodash/array/take'
import find from 'lodash/collection/find'

import { isUserAdmin } from '../utils'
import { deleteThread, toggleThreadLocked, deletePost } from '../updates'

import ReplyToThread from './Thread/ReplyToThread'
import Post from './Thread/Post'
import Posts from './Thread/Posts'
import ShowPagination from './Thread/ShowPagination'
import DeleteDialog from './Thread/DeleteDialog'
import LockDialog from './Thread/LockDialog'
import DeletePostDialog from './Thread/DeletePostDialog'
import TopToolbar from './Thread/TopToolbar'
import DeleteButton from './Thread/DeleteButton'
import LockButton from './Thread/LockButton'

class Thread extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      currentPage: 1,
      quote: null,
      postKey: null,
      deleteDialogVisible: false,
      lockDialogVisible: false,
      deletePostDialogVisible: false,
      deletePostKey: null
    }
    // TODO: use some autobind plugin
    this.handlePageSelect = this.handlePageSelect.bind(this)
    this.updateQuote = this.updateQuote.bind(this)
    this.selectLastPage = this.selectLastPage.bind(this)
    this.deleteThread = this.deleteThread.bind(this)
    this.deletePost = this.deletePost.bind(this)
    this.toggleLocked = this.toggleLocked.bind(this)
    this.showDeleteDialog = this.showDeleteDialog.bind(this)
    this.hideDeleteDialog = this.hideDeleteDialog.bind(this)
    this.showLockDialog = this.showLockDialog.bind(this)
    this.hideLockDialog = this.hideLockDialog.bind(this)
    this.showDeletePostDialog = this.showDeletePostDialog.bind(this)
    this.hideDeletePostDialog = this.hideDeletePostDialog.bind(this)
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  handlePageSelect(page) {
    window.scrollTo(0, 0)
    this.setState({ currentPage: page })
  }

  selectLastPage() {
    const { value: posts = [] } = this.props.threadPosts || {}
    const { value: settings = {} } = this.props.settings || {}
    const { THREAD_PAGE_SIZE } = settings
    const remainder = (posts.length + 1) % THREAD_PAGE_SIZE
    const pages = Math.floor((posts.length + 1) / THREAD_PAGE_SIZE)
    const lastPage = remainder === 0 ? pages : pages + 1
    this.handlePageSelect(lastPage)
  }

  updateQuote(quote, postKey) {
    this.setState({ quote, postKey })
  }

  hideDeleteDialog() {
    this.setState({ deleteDialogVisible: false })
  }

  showDeleteDialog() {
    this.setState({ deleteDialogVisible: true })
  }

  hideLockDialog() {
    this.setState({ lockDialogVisible: false })
  }

  showLockDialog() {
    this.setState({ lockDialogVisible: true })
  }

  showDeletePostDialog(postKey) {
    this.setState({
      deletePostDialogVisible: true,
      deletePostKey: postKey
    })
  }

  hideDeletePostDialog() {
    this.setState({
      deletePostDialogVisible: false,
      deletePostKey: null
    })
  }

  deleteThread() {
    const { submit, dispatch } = this.props
    const { key: threadKey, value: thread } = this.props.thread || {}
    submit(deleteThread({ threadKey, thread }))
    dispatch(routeActions.push(`/board/${thread.boardId}`))
  }

  deletePost() {
    const { value: posts = [] } = this.props.threadPosts || {}
    const post = find(posts, (threadPost) => {
      return threadPost.key === this.state.deletePostKey
    })
    this.props.submit(deletePost({ postKey: this.state.deletePostKey, post: post.value }))
    this.hideDeletePostDialog()
  }

  toggleLocked() {
    const { submit } = this.props
    const { key: threadKey, value: thread = {} } = this.props.thread || {}
    submit(toggleThreadLocked({ threadKey, thread }))
    this.hideLockDialog()
  }

  render() {
    const { key: threadKey, value: thread = {} } = this.props.thread || {}
    const { value: posts = [] } = this.props.threadPosts || {}
    const { value: settings = {} } = this.props.settings || {}
    const { authenticatedUser: user, styles } = this.props
    const { THREAD_PAGE_SIZE, THREAD_PAGE_LIMIT } = settings
    const isAdmin = isUserAdmin(this.props.adminUsers, this.props.authenticatedUser)
    const pagedPosts = take(drop(posts, (this.state.currentPage - 1) * THREAD_PAGE_SIZE), THREAD_PAGE_SIZE)
    const locked = thread.locked
      ? <LockIcon size="22px" />
      : <span />

    return (
      <div>
        <DeleteDialog
          visible={this.state.deleteDialogVisible}
          hide={this.hideDeleteDialog}
          save={this.deleteThread}
          title={thread.title} />
        <LockDialog
          visible={this.state.lockDialogVisible}
          hide={this.hideLockDialog}
          save={this.toggleLocked}
          title={thread.title}
          locked={thread.locked} />
        <DeletePostDialog
          visible={this.state.deletePostDialogVisible}
          hide={this.hideDeletePostDialog}
          save={this.deletePost} />
        <Card>
          <div className={styles.paginationContainer}>
            <div className={styles.headerContainer}>
              <div className={styles.lockContainer}>
                {locked}
              </div>
              <h2 className={styles.header}>
                {thread.title}
              </h2>
            </div>
            <TopToolbar
              isAdmin={isAdmin}
              posts={posts}
              pageSize={THREAD_PAGE_SIZE}>
              <ShowPagination
                currentPage={this.state.currentPage}
                handlePageSelect={this.handlePageSelect}
                posts={posts}
                pageSize={THREAD_PAGE_SIZE}
                pageLimit={THREAD_PAGE_LIMIT} />
              <div className={styles.buttonsContainer}>
                <DeleteButton
                  visible={isAdmin}
                  confirmDelete={this.showDeleteDialog} />
                <LockButton
                  visible={isAdmin}
                  locked={thread.locked}
                  confirmLockedChange={this.showLockDialog} />
              </div>
            </TopToolbar>
          </div>
          <Posts
            posts={pagedPosts}
            deletePost={this.showDeletePostDialog}
            updateQuote={this.updateQuote}
            user={user}
            locked={thread.locked}
            isAdmin={isAdmin} />
          <div className={styles.paginationContainer}>
            <ShowPagination
              currentPage={this.state.currentPage}
              handlePageSelect={this.handlePageSelect}
              posts={posts}
              pageSize={THREAD_PAGE_SIZE}
              pageLimit={THREAD_PAGE_LIMIT} />
          </div>
        </Card>

        <ReplyToThread
          user={user}
          threadKey={threadKey}
          postKey={this.state.postKey}
          quote={this.state.quote}
          locked={thread.locked}
          selectLastPage={this.selectLastPage} />
      </div>
    )
  }
}

export default styles(
  {
    header: {
      minHeight: "28px",
      margin: "0em 0 1em 0",
      display: "inline-block"
    },
    lockContainer: {
      display: "inline-block",
      verticalAlign: "top",
      paddingTop: "4px",
      paddingRight: "5px"
    },
    paginationContainer: {
      position: "relative",
      minHeight: "32px"
    },
    buttonsContainer: {
      display: "inline-block"
    }
  },
  FirebaseWrite({ method: "update" })(
    bindings(["thread", "threadPosts", "adminUsers", "settings"], ["authenticatedUser"])(Thread)
  )
)
