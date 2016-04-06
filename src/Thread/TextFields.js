import React from 'react'
import { FormField, FormInput } from 'elemental'

const TextFields = ({ preview, text, updateText, inputRef }) => {
  if (preview) {
    return <div />
  } else {
    return (
      <FormField>
        <FormInput
          placeholder="Text (markdown enabled)"
          value={text}
          multiline
          onChange={updateText}
          ref={(input) => inputRef(input)} />
      </FormField>
    )
  }
}

export default TextFields
