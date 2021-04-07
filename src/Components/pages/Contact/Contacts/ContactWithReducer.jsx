import React from 'react';
import styles from '../contact.module.css'
import { Form, Button } from 'react-bootstrap';
import { useReducer } from 'react';
import Spinner from '../../../Spinner/Spinner';
import ContactFormModal from './ContactFormModal';
import { isRequired, maxLength, minLength, validateEmail } from '../../../helpers/validators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCheckCircle, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import ErrorModal from '../../../Modal/ErrorModal';
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
const initialState = {
    formData: {
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

    },
    loading: false,
    errorMessage: '',
    errorStatus:'',
    toggleErrorModal:false,
    isOpen:false
}
const reducer = (state = initialState, action) => {

    switch (action.type) {

        case 'change': {
            const { target } = action;
            const { name, value } = target;
            let valid = true;
            let error = null;
            error = isRequired(value) ||
                (name === 'name' ? maxLength30(value) : null) ||
                (name === 'name' || name === 'message' ? minLength3(value) : null) ||
                (name === 'email' && validateEmail(value))

            if (error) valid = false
            return {
                ...state,
                formData: {
                    ...state.formData,
                    [name]: {
                        valid: valid,
                        error: error,
                        value: value
                    }
                }

            }
        }
        case 'SET_LOADING': {
            return {
                ...state,
                loading: true
            }
        }
        case 'REMOVE_LOADING': {
            return {
                ...state,
                loading: false
            }
        }
        case 'CLEAR_FORM_DATA' : {
            return{
                formData:initialState.formData
            }
        }
        case 'SET_ERROR_MESSAGE' : {
            return {
                ...state,
                errorMessage:action.error
            }
        }
        case 'SET_ERROR_STATUS' : {
            return {
                ...state,
                errorStatus:action.error
            }
        }
        case 'OPEN_MODAL' : {
            return {
                ...state,
                isOpen:!state.isOpen
            }
        }
        case 'OPEN_ERROR_MODAL' : {
            return {
                ...state,
                toggleErrorModal:!state.toggleErrorModal
            }
        }
        default: return state
    }
}

const ContactWithReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChange = ({ target }) => {
        const action = {
            type: 'change',
            target: target
        }
        dispatch(action)
    }
    const handleSubmit = () => {
        const formData = {...state.formData};
            for (let key in formData) {
                if (typeof formData[key] === 'object' && formData[key].hasOwnProperty('value'))
                    formData[key] = formData[key].value;
                else delete formData[key].value
            }

            if (!formData.name.trim() ||
                !formData.email.trim() ||
                !formData.message.trim()) return;
                
            dispatch({type:'SET_LOADING'})
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
                    dispatch({type:'CLEAR_FORM_DATA'})
                    dispatch({type:'OPEN_MODAL'})
                })
                .catch(error => {
                    dispatch({type:'REMOVE_LOADING'})
                    
                    dispatch({type:'SET_ERROR_MESSAGE',error:error.message})
                    dispatch({type:'SET_ERROR_STATUS',error:error.status})
                    dispatch({type:'OPEN_ERROR_MODAL'})
                })
                
    }
    const toggleOpenModal = () => {
        dispatch({type:'OPEN_MODAL'})
    }
    const toggleOpenErrorModal = () => {
        dispatch({type:'OPEN_ERROR_MODAL'})
    }
    const { formData, loading ,isOpen,errorStatus} = state;
    const formGroup = forms.map((form, index) => {
        
        const inputValue = formData[form.name].value
        const errorMessage = formData[form.name].error
        return (
            <Form.Group
                className={styles.formGroup}
                key={index}
            >
                <Form.Control
                    type={form.name}
                    placeholder={form.placeholder}
                    name={form.name}
                    value={formData[form.name].value}
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
            <h1 className={styles.title}>Contact Form With Reducer</h1>
            <div className={styles.formWrapper}>
                <Form
                    onSubmit={(event) => event.preventDefault()}
                    className={styles.formReducerBody}
                >
                    <h2>Send Your Message</h2>
                   
                    <small
                        style={{ textTransform: 'capitalize', color: 'red' }}>
                        {state.errorMessage}
                    </small>
                    {formGroup}
                    <Button
                        className={styles.formGroupBtn}
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!formData.name.valid || !formData.email.valid || !formData.message.valid} 
                    >
                        Send
                        </Button>
                </Form>
            </div>
            { 
                 !!isOpen && 
                 <ContactFormModal 
                    onHide={toggleOpenModal}
                    name={state.formData.name.value}
                    email={formData.email.value}
                    message={formData.message.value}
                />
            }
            {
                !!loading && <Spinner />
            }
            { 
                !!state.toggleErrorModal && 
                <ErrorModal 
                errorMessage={state.errorMessage}
                errorStatus={errorStatus}
                onHide={toggleOpenErrorModal}
                />     
            }  

        </div>
    )
}
export default ContactWithReducer;