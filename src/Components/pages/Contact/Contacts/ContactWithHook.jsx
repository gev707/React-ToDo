import React from 'react';
import styles from '../contact.module.css'
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import Spinner from '../../../Spinner/Spinner';
import ContactFormModal from './ContactFormModal'
import { isRequired, maxLength, minLength, validateEmail } from '../../../helpers/validators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCheckCircle, faCaretDown } from '@fortawesome/free-solid-svg-icons';
const ContactWithHook = (props) => {
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
    const API_HOST = 'http://localhost:3001';
    const maxLength30 = maxLength(30);
    const minLength3 = minLength(3);

    const [values, setValues] = useState({
        name: {
            valid: false,
            error: false,
            value: ''
        },
        email: {
            valid: false,
            error: false,
            value: ''
        },
        message: {
            valid: false,
            error: false,
            value: ''
        }
    });
    const [spinner, setSpinner] = useState({
        loading: false
    });
    const [errorMessage, setErrorMessage] = useState({
        infoErrorMessage: ''
    });
    const [contactModal, setContactModal] = useState({
        isOpen: false
    });
    const toggleOpenContactModal = () => {
        setContactModal({
            isOpen: !contactModal.isOpen
        })
    }
    const handleChange = ({ target: { name, value } }) => {
        let valid = true;
        let error = null;
        error = isRequired(value) ||
            (name === 'name' ? maxLength30(value) : null) ||
            (name === 'name' || name === 'message' ? minLength3(value) : null) ||
            (name === 'email' && validateEmail(value))

        if (error) valid = false
        setValues({
            ...values,
            [name]: {
                valid: valid,
                error: error,
                value: value
            }
        })

    }
    const handleSubmit = () => {
        const formData = { ...values };
        for (let key in formData) {
            if (typeof formData[key] === 'object' && formData[key].hasOwnProperty('value'))
                formData[key] = formData[key].value;
            else delete formData[key].value
        }

        if (!formData.name.trim() ||
            !formData.email.trim() ||
            !formData.message.trim()) return;
        setSpinner({
            loading: true,
        });
        setErrorMessage({
            errorMessage: ''
        })
        fetch(`${API_HOST}/form`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error
                setContactModal({
                    isOpen: !contactModal.isOpen
                })
                setValues({
                    ...values,
                    name: {
                        valid: false,
                        error: false,
                        value: ''
                    },
                    email: {
                        valid: false,
                        error: false,
                        value: ''
                    },
                    message: {
                        valid: false,
                        error: false,
                        value: ''
                    }
                })
            })
            .catch(error => {
                setErrorMessage({
                    errorMessage: error.message.slice(6)
                })
                console.log('send', error);
            })
            .finally(() => {
                setSpinner({
                    loading: false,
                })
            })
    }
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
        <div className={styles.formHolder}>
            <h1 className={styles.title}>Contact Form With Hooks</h1>
            <div className={styles.formWrapper}>
                <Form
                    onSubmit={(event) => event.preventDefault()}
                    className={styles.formHookBody}
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
            </div>
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
        </div>
    )
}
export default ContactWithHook