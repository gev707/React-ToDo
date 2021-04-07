
import styles from '../contact.module.css'
import { Form, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { contextForContact } from '../../../../Context/context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCheckCircle, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../../../Spinner/Spinner';
import ContactFormModal from './ContactFormModal';

const forms = [
    {
        name: 'name',
        type: 'text',
        placeholder: 'Name'
    },
    {
        name: 'email',
        type: 'email',
        placeholder: 'Email'
    },
    {
        name: 'message',
        type: null,
        placeholder: 'Your Message',
        as: 'textarea',
        rows: 3,
    }
];
const ContactWithContext = () => {
    const context = useContext(contextForContact)
    const { 
        values,
        handleSubmit,
        handleChange,
        toggleOpenContactModal,
        spinner,
        errorMessage,
        contactModal } = context;

    const formGroup = forms.map((form, index) => {
        const inputValue = values[form.name].value
        const errorMessage = values[form.name].error
        return (
            <Form.Group
                className={styles.formGroup}
                key={index}
            >
                <Form.Control
                    type={form.name}
                    placeholder={form.placeholder}
                    name={form.name}
                    value={values[form.name].value}
                    onChange={handleChange}
                    as={form.as || undefined}
                    rows={form.rows || undefined}
                />
                <div>{inputValue === '' && !errorMessage ?
                    null : errorMessage ?
                        <div className={styles.tooltips}>
                            <FontAwesomeIcon
                                className={styles.errorIcon}
                                icon={faExclamationTriangle}
                            />
                            <div className={styles.errorTooltips}>
                                {errorMessage}
                                <FontAwesomeIcon
                                    className={styles.caret}
                                    icon={faCaretDown}
                                />
                            </div>
                        </div>
                        :
                        <div>
                            <FontAwesomeIcon
                                className={styles.validIcon}
                                icon={faCheckCircle}
                                style={{ color: 'green' }}
                            />
                        </div>
                }
                </div>
            </Form.Group>

        )
    });
    return (

        <contextForContact.Consumer>
            {
                function (context) {

                    return (
                        <>

                            <Form
                                onSubmit={(event) => event.preventDefault()}
                                className={styles.formContextBody}
                            >
                                <h2>Send Your Message</h2>
                                <small
                                    style={{ textTransform: 'capitalize', color: 'red' }}>
                                    {errorMessage.infoErrorMessage}
                                </small>
                                {formGroup}
                                <Button
                                    className={styles.formGroupBtn}
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={!values.name.valid || !values.email.valid || !values.message.valid}
                                >
                                    Send
                                        </Button>
                            </Form>

                            {
                                !!contactModal.isOpen && <ContactFormModal
                                    onHide={toggleOpenContactModal}
                                    name={values.name.value}
                                    email={values.email.value}
                                    message={values.message.value}
                                />

                            }
                            {
                                !!spinner.loading && <Spinner />
                            }
                        </>
                    )
                }
            }
        </contextForContact.Consumer>

    )
}
export default ContactWithContext