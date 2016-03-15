import React from 'react'
import { styles } from 'refire-app'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../App/CodeBlock'

const PreviewFields = ({ preview, text, styles }) => {
  if (preview) {
    return (
      <div>
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
  textPreview: {
    "& p": {
      margin: "0 0 20px 0"
    }
  }
}, PreviewFields)
