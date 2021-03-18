import PropTypes from 'prop-types';
import React, { PureComponent, createRef } from "react";
import styles from "./modal.module.css";

class Modal extends PureComponent {
    constructor(props) {
        super(props);
        this.inputRef = createRef();
        this.state = {
            title: '',
            description: '',
            ...props.editableCard
        }
    };

    handleChangeInputValue = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    };

    handleSubmit = ({ key,type }) => {
        const { title, description, } = this.state;
        if (!title || !description || (type === 'keypress' && key !== 'Enter')) return;
        
        this.props.onSubmit(this.state);
        this.props.onHide();
    };

    componentDidMount() {
        this.inputRef.current.focus();
    }

    render(){
        const {onHide,editableCard} = this.props;
        const {title,description} = this.state
        
        return (
                <div 
                     className={styles.modalHolder}
                > 
                    <div  className={styles.closeModal}>
                        <span onClick={onHide}></span>
                    </div>
                    <h2>{editableCard?"Edit Card" :'Create Your Card'}</h2>
                    <div className='p-2'>
                        <div className={styles.inputHolder}>
                            <input
                                name='title'
                                className={styles.inputItem}
                                type="text"
                                placeholder='Add some Card'
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
                                placeholder='Card Description. . . '
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
                            >{editableCard ? 'Save Card':'Add Card' }
                        </button>
                    </div>
                </div>
        )
    }
    
}
Modal.propTypes = {
    onHide:PropTypes.func.isRequired,
    onSubmit:PropTypes.func.isRequired
}
export default Modal