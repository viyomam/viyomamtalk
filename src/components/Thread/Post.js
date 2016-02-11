import React from 'react'
import { Link, styles } from 'refire-app'
import { Row, Col, Card, Glyph } from 'elemental'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'

// TODO: load from firebase settings collection
const DATE_FORMAT = "DD.MM.YYYY HH:mm"

const QuoteButton = ({ user, onClick, styles }) => {
  if (user) {
    return (
      <span onClick={onClick}>
        <Glyph icon="quote" className={styles.quoteButton} />
      </span>
    )
  } else {
    return <span />
  }
}

const ReplyButton = ({ user, onClick, styles }) => {
  if (user) {
    return (
      <span onClick={onClick}>
        <Glyph icon="mail-reply" className={styles.replyButton} />
      </span>
    )
  } else {
    return <span />
  }
}

const Post = ({ post, user, updateQuote, styles }) => {
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
            <ReactMarkdown escapeHtml={true} source={post.body} />
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
                {moment(post.createdAt, "x").fromNow()}
              </div>
              <QuoteButton user={user} onClick={() => updateQuote(post.body)} styles={styles} />
              <ReplyButton user={user} onClick={() => updateQuote("")} styles={styles} />
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
    margin: "0 0 10px 0"
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
  quoteButton: {
    cursor: "pointer",
    fontSize: "24px",
    paddingLeft: "20px",
    paddingRight: "20px",
    color: "#555",
    "@media (min-width: 480px)": {
      fontSize: "20px"
    }
  },
  replyButton: {
    cursor: "pointer",
    fontSize: "24px",
    color: "#555",
    "@media (min-width: 480px)": {
      fontSize: "20px"
    }
  },
  postDate: {
    display: "inline-block"
  }
}, Post)
