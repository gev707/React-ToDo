import { Modal, Button } from 'react-bootstrap'
import styles from './contact.module.css'
const ContactFormModal = ({onHide}) => {
    const handleClose = () => {
        onHide()
    }
    return (
        <div className={styles.contactModal}>
            <Modal.Dialog>
            <Modal.Header>
                <Modal.Title>Contact Form</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Successfull add contacts</p>
            </Modal.Body>

            <Modal.Footer>
                <Button 
                variant="secondary"
                onClick={handleClose}
                >Close</Button>
            </Modal.Footer>
        </Modal.Dialog>
        </div>
        
    )
}
export default ContactFormModal