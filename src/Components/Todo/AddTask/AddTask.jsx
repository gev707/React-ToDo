import React, { PureComponent, createRef } from "react";
import styles from '../todo.module.css'
import PropTypes from 'prop-types';

class AddTask extends PureComponent {
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
        })
    };

    componentDidMount() {
        this.inputRef.current.focus();
    };

    render() {

        const { isAnyTasksChecked } = this.props;
        const { title, description } = this.state;
       
        return (

            <div>
                <div className={styles.inputHolder}>
                    <input
                        name='title'
                        className={styles.inputItem}
                        type="text"
                        placeholder='Add some text'
                        onChange={this.handleChangeInputValue}
                        onKeyPress={this.handleSubmit}
                        value={title}
                        disabled={isAnyTasksChecked}
                        ref={this.inputRef}
                    />
                    <button
                        className={!!title ? styles.btnAdd : styles.disabledBtn}
                        onClick={this.handleSubmit}
                        disabled={isAnyTasksChecked || !title || !description}
                    >
                        Add Text
                        </button>
                </div>
                <div>
                    <textarea
                        name='description'
                        className={styles.textarea}
                        onChange={this.handleChangeInputValue}
                        placeholder='Description...'
                        style={{ resize: 'none' }}
                        value={description}>
                    </textarea>
                </div>
            </div>

        )
    }
}
AddTask.propTypes = {
    handleSubmit: PropTypes.func,
    isAnyTasksChecked: PropTypes.bool
}

export default AddTask