import PropTypes from 'prop-types';
import React, { PureComponent} from "react";
import dateFormat from '../helpers/dateFormatter'
import DatePicker from "react-datepicker";
import styles from "./modal.module.css";

class Modal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            ...props.editCard,
            date:props.editCard ? new Date(props.editCard.date):new Date(),
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
        const formData ={
            ...this.state,
            date:dateFormat(this.state.date)
        }
        this.props.onSubmit(formData);
    };
    setDate = (date) => {
        this.setState({
            date
        })
    }
    

    render(){
        const {onHide,editCard} = this.props;
        const {title,description,date} = this.state
        
        return (
                <div 
                     className={styles.modalHolder}
                > 
                    <div  className={styles.closeModal}>
                        <span onClick={event=>onHide()}></span>
                    </div>
                    <h2>{editCard?"Edit Card" :'Create Your Card'}</h2>
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
                        <div className="d-flex mt-3">
                            <DatePicker 
                                selected={date} 
                                onChange={date => this.setDate(date)}
                                className='datapicker' 
                            />
                        </div>
                    </div>
                    <div className={styles.btnSave}>
                        <button 
                            onClick={(e) => onHide()}
                            >Close Card
                        </button>
                        <button 
                            onClick={this.handleSubmit}
                            >{editCard ? 'Save Card':'Add Card' }
                        </button>
                    </div>
                </div>
        )
    }
    
}
Modal.propTypes = {
    editCard:PropTypes.object,
    onSubmit:PropTypes.func.isRequired
}
export default Modal