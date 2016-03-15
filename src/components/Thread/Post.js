import React from 'react'
import { Link, styles } from 'refire-app'
import { Row, Col, Card } from 'elemental'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../App/CodeBlock'
import QuoteIcon from 'react-icons/lib/fa/quote-left'
import TrashIcon from 'react-icons/lib/fa/trash'
import ReplyIcon from 'react-icons/lib/fa/reply'

const DeleteButton = ({ user, isAdmin, onClick, styles }) => {
  if (user && isAdmin) {
    return (
      <span onClick={onClick} title="Delete">
        <span className={styles.trashButton}>
          <TrashIcon size="16px" />
        </span>
      </span>
    )
  } else {
    return <span />
  }
}

const QuoteButton = ({ user, locked, onClick, styles }) => {
  if (user && !locked) {
    return (
      <span onClick={onClick} title="Quote">
        <span className={styles.quoteButton}>
          <QuoteIcon size="16px" />
        </span>
      </span>
    )
  } else {
    return <span />
  }
}

const ReplyButton = ({ user, locked, onClick, styles }) => {
  if (user && !locked) {
    return (
      <span onClick={onClick} title="Reply">
        <span className={styles.replyButton}>
          <ReplyIcon size="20px" />
        </span>
      </span>
    )
  } else {
    return <span />
  }
}

const Post = ({
  postKey,
  post,
  user,
  locked,
  isAdmin,
  deletePost,
  updateQuote,
  styles
}) => {
  return (
    <Row>
      <Col xs="0%" sm="1/8" lg="1/12">
        <div className={styles.profileContainer}>
          <Link to={`/profile/${post.user.id}`}>
            <img src={post.user.image} className={styles.image} />
          </Link>
        </div>
      </Col>
      <Col xs="100%" sm="7/8" lg="11/12">
        <Card>
          <div className={styles.bodyContainer}>
            <ReactMarkdown
              className={styles.markdown}
              escapeHtml={true}
              source={post.body}
              renderers={{...ReactMarkdown.renderers, ...{ CodeBlock }}} />
          </div>
          <div className={styles.bottomToolbar}>
            <div className={styles.mobileProfileContainer}>
              <Link to={`/profile/${post.user.id}`}>
                <img src={post.user.image} className={styles.mobileImage} />
              </Link>
            </div>
            <strong className={styles.nameContainer}>
              {post.user.displayName}
            </strong>

            <div className={styles.actionsContainer}>
              <div className={styles.postDate}>
                {moment(post.createdAt, "x").fromNow()} ago
              </div>
              <DeleteButton user={user} isAdmin={isAdmin} onClick={() => deletePost(postKey, post)} styles={styles} />
              <QuoteButton user={user} locked={locked} onClick={() => updateQuote(post.body, postKey)} styles={styles} />
              <ReplyButton user={user} locked={locked} onClick={() => updateQuote("", postKey)} styles={styles} />
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  )
}

export default styles({
  image: {
    display: "none",
    "@media (min-width: 480px)": {
      display: "inline-block",
      width: "40px",
      height: "40px",
      borderRadius: "20px",
      marginTop: "10px",
    }
  },
  mobileImage: {
    display: "inline-block",
    width: "30px",
    height: "30px",
    borderRadius: "15px",
    marginRight: "10px",
    "@media (min-width: 480px)": {
      display: "none"
    }
  },
  profileContainer: {
    position: "relative",
    textAlign: "center"
  },
  mobileProfileContainer: {
    position: "relative",
    textAlign: "left",
    display: "inline-block",
    marginTop: "10px",
    "@media (min-width: 480px)": {
      display: "none"
    }
  },
  bodyContainer: {
    margin: "0 0 10px 0",
  },
  bottomToolbar: {
    position: "relative"
  },
  nameContainer: {
    display: "inline-block",
    verticalAlign: "middle",
    "@media (min-width: 480px)": {
      display: "block"
    }
  },
  actionsContainer: {
    display: "block",
    paddingTop: "10px",
    "@media (min-width: 480px)": {
      paddingTop: 0,
      position: "absolute",
      right: 0,
      top: 0
    }
  },
  trashButton: {
    cursor: "pointer",
    verticalAlign: "top",
    display: "inline-block",
    paddingRight: "20px",
    verticalAlign: "top",
    color: "#555",
  },
  quoteButton: {
    cursor: "pointer",
    display: "inline-block",
    verticalAlign: "top",
    paddingRight: "20px",
    color: "#555",
  },
  replyButton: {
    cursor: "pointer",
    color: "#555",
    display: "inline-block",
    verticalAlign: "top"
  },
  postDate: {
    display: "inline-block",
    verticalAlign: "top",
    paddingRight: "20px"
  },
  markdown: {
    "& > p": {
      margin: "10px 0 20px 0"
    }
  }
}, Post)
