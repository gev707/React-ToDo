import ContactWithContext from './Contacts/ContactWithContext';
import ContactProvider from '../../../Context/providers/ContactProvider'
import styles from './contact.module.css'
const ContactPage = () => {
    return (
        <div className={styles.formHolder}>
            <h1 className={styles.title}>Contact Form With Hooks</h1>
            <div className={styles.formWrapper}>
            <ContactProvider>
                <ContactWithContext />
            </ContactProvider>
            </div>
           
        </div>
    )
}
export default ContactPage