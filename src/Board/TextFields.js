import React from 'react'
import { FormField, FormInput } from 'elemental'

const TextFields = ({ preview, inputRef, topic, text, updateTopic, updateText }) => {
  if (preview) {
    return <div />
  } else {
    return (
      <div>
        <FormField>
          <FormInput
            ref={inputRef}
            placeholder="New topic"
            value={topic}
            onChange={updateTopic} />
        </FormField>
        <FormField>
          <FormInput
            placeholder="Text (markdown enabled)"
            value={text}
            multiline
            onChange={updateText} />
        </FormField>
      </div>
    )
  }
}

export default TextFields
