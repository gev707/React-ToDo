import { Form, Button } from 'react-bootstrap';
import React, { PureComponent } from 'react';
import styles from '../contact.module.css';
import ContactFormModal from './ContactFormModal';
import Spinner from '../../../Spinner/Spinner';
import { isRequired, maxLength ,minLength,validateEmail} from '../../../helpers/validators';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCheckCircle,faCaretDown } from '@fortawesome/free-solid-svg-icons';

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

const maxLength30 = maxLength(30)
const minLength3 = minLength(3)

class Contact extends PureComponent {
    state = {
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
        },
        loading: false,
        isOpen: false,
        infoErrorMessage:''
    }
    toggleOpenContactModal = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }
    handleChange = ({ target: { name, value } }) => {
        let valid = true;
        let error = null;
        error = isRequired(value) || 
            (name === 'name' ? maxLength30(value): null) ||
            (name === 'name' || name === 'message' ? minLength3(value): null) || 
            (name === 'email' && validateEmail(value)) 

        if (error) valid = false

        this.setState({
            [name]: {
                valid: valid,
                error: error,
                value: value
            }
        })
    }
    handleSubmit = () => {
        const formData = { ...this.state };
        delete formData.loading;
        for (let key in formData) {
            if (typeof formData[key] === 'object' && formData[key].hasOwnProperty('value')) {
                formData[key] = formData[key].value;
            }
               
            else {
                delete formData[key].value
                
            }
        }
        
        if (!formData.name.trim() || 
            !formData.email.trim() || 
            !formData.message.trim()) return;
        this.setState({ 
            loading: true ,
            infoErrorMessage:''
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
                console.log(formData)
                   this.setState({
                        loading:false,
                        isOpen:!this.state.isOpen
                   })
            })
            .catch(error => {
                this.setState({ 
                    loading: false,
                    infoErrorMessage:error.message.slice(6) 
                })
                console.log('send', error);
            })
    }

    render() {

        const { name, email, message, isOpen, loading} = this.state;
        const formGroup = forms.map((form, index) => {
        const errorMessage = this.state[form.name].error;
        const inputValue = this.state[form.name].value;
            return (
                    <Form.Group
                        className={styles.formGroup}
                        key={index}
                    >
                        <Form.Control
                            type={form.name}
                            placeholder={form.placeholder}
                            name={form.name}
                            value={inputValue}
                            onChange={this.handleChange}
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
                <h1 className={styles.title}>Contact Form With Class</h1>
                <div className={styles.formWrapper}>
                    <Form
                        onSubmit={(event) => event.preventDefault()}
                        className={styles.formBody}
                    >
                        <h2>Send Your Message</h2>
                        <small 
                            style={{textTransform : 'capitalize', color : 'red'}}>
                            {this.state.infoErrorMessage}
                        </small>
                        {formGroup}
                        <Button
                            className={styles.formGroupBtn}
                            type="submit"
                            onClick={this.handleSubmit}
                            disabled={!name.valid || !email.valid || !message.valid}
                        >
                            Send
                        </Button>
                    </Form>
                </div>
                {
                    isOpen && <ContactFormModal
                        onHide={this.toggleOpenContactModal}
                        name={name.value}
                        email={email.value}
                        message={message.value}
                    />
                }
                {
                    loading && <Spinner />
                }

            </div>
        )
    }
}

export default Contact;