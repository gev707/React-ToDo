import { useState } from 'react';
import { contextForContact } from '../context';
import { isRequired, maxLength, minLength, validateEmail } from '../../Components/helpers/validators';
const API_HOST = 'http://localhost:3001';
const maxLength30 = maxLength(30);
const minLength3 = minLength(3);

const ContactProvider = (props) => {
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
    return (
        <contextForContact.Provider value={{
            values,
            setValues,

            spinner,
            setSpinner,
            errorMessage,
            setErrorMessage,
            contactModal,
            setContactModal,
            //functions
            toggleOpenContactModal,
            handleChange,
            handleSubmit
        }}>
            {props.children}
        </contextForContact.Provider>
    )
}
export default ContactProvider