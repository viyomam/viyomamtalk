import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'elemental'

const SettingsModal = ({
  cancelText = "Cancel",
  children,
  save,
  saveText = "Save",
  title,
  hide,
  visible,
  width="medium"
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
    	<ModalFooter>
    		<Button type="primary" onClick={save}>
          {saveText}
        </Button>
    		<Button type="link-cancel" onClick={hide}>
          {cancelText}
        </Button>
    	</ModalFooter>
    </Modal>
  )
}

export default SettingsModal
