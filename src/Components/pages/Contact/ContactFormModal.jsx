import { Modal, Button } from 'react-bootstrap'
import styles from './contact.module.css'
const ContactFormModal = ({ onHide,name,email,message}) => {
    
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
                    <p>Name -  {name}</p>
                    <p>Email -  {email}</p>
                    <p>Message -  {message}</p>
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