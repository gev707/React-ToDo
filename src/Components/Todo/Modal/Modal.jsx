import PropTypes from 'prop-types';
import React, { PureComponent, createRef } from "react";
import styles from "./modal.module.css";
class Modal extends PureComponent {
    constructor(props) {
        super(props);
        this.inputRef = createRef();
        this.state = {
            title: '',
            description: ''
        }
    };

    handleChangeInputValue = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    handleSubmit = ({ key,type }) => {
        const { title, description } = this.state;
        if (!title || !description || (type === 'keypress' && key !== 'Enter')) return;
        const formData = {
            title,
            description
        }
        this.props.addTask(formData)
        this.setState({
            title: '',
            description: ''
        },()=>{
            this.props.onHide()
        })
    };

    componentDidMount() {
        this.inputRef.current.focus();
    }

    render(){
        const {onHide} = this.props;
        const {title,description} = this.state
        
        return (
                <div className={styles.modalHolder}> 
                    <div  className={styles.closeModal}>
                        <span onClick={onHide}></span>
                    </div>
                    <h2>Create Your Card</h2>
                    <div className='p-2'>
                        <div className={styles.inputHolder}>
                            <input
                                name='title'
                                className={styles.inputItem}
                                type="text"
                                placeholder='Add some text'
                                onChange={this.handleChangeInputValue}
                                onKeyPress={this.handleSubmit}
                                value={title}
                                ref={this.inputRef}
                            />
                           
                        </div>
                        <div>
                            <textarea
                                name='description'
                                className={styles.textarea}
                                onChange={this.handleChangeInputValue}
                                placeholder='Description...'
                                style={{ resize: 'none' }}
                                value={description}
                                >
                            </textarea>
                        </div>
                    </div>
                    <div className={styles.btnSave}>
                        <button 
                            onClick={onHide}
                            >Close Card
                        </button>
                        <button 
                            onClick={this.handleSubmit}
                            >Add Card
                        </button>
                    </div>
                </div>
        )
    }
    
}
Modal.propTypes = {
    isOpen:PropTypes.bool,
    editTask:PropTypes.func
}
export default Modal