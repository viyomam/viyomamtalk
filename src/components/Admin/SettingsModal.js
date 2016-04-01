import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'elemental'

const DefaultFooter = ({save, saveText, hide, cancelText}) => (
  <ModalFooter>
    <Button type="primary" onClick={save}>
      {saveText}
    </Button>
    <Button type="link-cancel" onClick={hide}>
      {cancelText}
    </Button>
  </ModalFooter>
)

const SettingsModal = ({
  cancelText = "Cancel",
  children,
  save,
  saveText = "Save",
  title,
  hide,
  visible,
  width="medium",
  Footer=DefaultFooter
}) => {
  return (
    <Modal
      isOpen={visible}
      onCancel={hide}
      width={width}
      backdropClosesModal>
    	<ModalHeader
        text={title}
        showCloseButton
        onClose={hide} />
    	<ModalBody>
        {children}
      </ModalBody>
      <Footer
        save={save}
        saveText={saveText}
        hide={hide}
        cancelText={cancelText} />
    </Modal>
  )
}

export default SettingsModal
