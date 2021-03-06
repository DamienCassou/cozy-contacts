import React from 'react'
import { PropTypes } from 'prop-types'
import withContactsMutations from '../../connections/allContacts'
import Modal, {
  ModalHeader,
  ModalDescription
} from 'cozy-ui/transpiled/react/Modal'
import ContactForm from '../ContactCard/ContactForm'

const ContactFormModal = ({
  onClose,
  title,
  createContact,
  onCreateContact
}) => (
  <Modal
    overflowHidden={true}
    dismissAction={onClose}
    into="body"
    size="xlarge"
  >
    <ModalHeader>{title}</ModalHeader>
    <ModalDescription className="u-mt-half">
      <ContactForm
        onSubmit={contact =>
          createContact(contact).then(resp => onCreateContact(resp.data))
        }
        onCancel={onClose}
      />
    </ModalDescription>
  </Modal>
)
ContactFormModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  createContact: PropTypes.func.isRequired,
  onCreateContact: PropTypes.func.isRequired
}

export default withContactsMutations(ContactFormModal)
