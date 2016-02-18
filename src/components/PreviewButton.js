import React from 'react'
import { Button, Glyph } from 'elemental'

const PreviewButton = ({ enabled, togglePreview }) => {
  if (enabled) {
    return (
      <Button type="link" onClick={togglePreview}>
        <Glyph icon="sign-out" /> Back to edit
      </Button>
    )
  } else {
    return (
      <Button type="link" onClick={togglePreview}>
        <Glyph icon="eye-watch" />Preview
      </Button>
    )
  }
}

export default PreviewButton
