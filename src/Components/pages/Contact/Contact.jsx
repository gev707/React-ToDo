
import { Form, Button } from 'react-bootstrap';
import React, { PureComponent } from 'react';
import styles from './contact.module.css';
import ContactFormModal from './ContactFormModal'
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
        as :'textarea',
        rows : 3,
    }
];
const API_HOST = 'http://localhost:3001';
class Contact extends PureComponent {
    state = {
        name: '',
        email: '',
        message: '',
        loading:false,
        isOpen:false
    }
    toggleOpenContactModal = () => {
        this.setState({
            isOpen:!this.state.isOpen
        })
    }
    handleChange = ({target: {name,value}}) => {
        this.setState({
            [name]:value
        })
    }
    handleSubmit = () => {
        const formData ={...this.state};
        delete formData.loading;
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
            this.setState({
                formData:data,
                isOpen:!this.state.isOpen
            });
        })
        .catch(error => {
            console.log(error);
        })
        
    }
    render() {
        const {isOpen} = this.state;
        const formGroup = forms.map((form, index) => {
            return (
                <Form.Group
                    className={styles.formGroup}
                    key={index}
                >
                    <Form.Control
                        type={form.name}
                        placeholder={form.placeholder}
                        name={form.name}
                        value={this.state[form.name]}
                        onChange={this.handleChange}
                        as={form.as || undefined}
                        rows={form.rows || undefined}
                    />
                </Form.Group>
            )
        })
        return (
            <div className={styles.formHolder}>
                <h1 className={styles.title}>Contact Section</h1>
                <div className={styles.formWrapper}>
                    <Form
                        onSubmit={(event) => event.preventDefault()}
                        className={styles.formBody}
                    >
                        <h2>Send Your Message</h2>
                        {formGroup}

                        <Button 
                            className={styles.formGroupBtn} 
                            variant="primary" 
                            type="submit"
                            onClick={this.handleSubmit}
                            >
                            Send
                        </Button>
                    </Form>
                </div>
                {
                    isOpen && <ContactFormModal  onHide={this.toggleOpenContactModal}/>
                }
            </div>
        )
    }
}

export default Contact;