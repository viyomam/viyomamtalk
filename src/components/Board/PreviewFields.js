import React from 'react'
import { styles } from 'refire-app'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../App/CodeBlock'

const PreviewFields = ({ preview, topic, text, styles }) => {
  if (preview) {
    return (
      <div>
        <h3 className={styles.topicPreview}>
          {topic}
        </h3>
        <div className={styles.textPreview}>
          <ReactMarkdown
            escapeHtml={true}
            source={text}
            renderers={{...ReactMarkdown.renderers, ...{ CodeBlock }}} />
        </div>
      </div>
    )
  } else {
    return <div />
  }
}

export default styles({
  topicPreview: {
    padding: "10px 0 0 0"
  },
  textPreview: {
    "& p": {
      margin: "0 0 20px 0"
    }
  }
}, PreviewFields)
