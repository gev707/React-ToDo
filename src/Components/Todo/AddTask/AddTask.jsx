import React from "react";
import styles from '../todo.module.css'
import PropTypes from 'prop-types';

class AddTask extends React.PureComponent {
    state = {
        inputValue: ''
    }
    handleChangeInputValue = (event) => {
        const { value } = event.target
        this.setState({
            inputValue: value
        })
    };
    handleEnter = (event) => {
        this.handleSubmit = () => {
            this.props.addTask(this.state.inputValue);
            this.setState({
                inputValue: ''
            })
        };
        if (event.key === 'Enter') this.handleSubmit()
    }
    render() {
        const {isAnyTasksChecked} =this.props;
        const{inputValue} = this.state;
        return (
            <div>
                <div className={styles.inputHolder}>
                    <div>
                        <input
                            className={styles.inputItem}
                            type="text"
                            placeholder='Add some text'
                            onChange={this.handleChangeInputValue}
                            onKeyPress={this.handleEnter}
                            value={this.state.inputValue}
                            disabled={isAnyTasksChecked}
                        />
                        <button
                            className={!!inputValue ? styles.btnAdd : styles.disabledBtn}
                            onClick={this.handleSubmit}
                            disabled={isAnyTasksChecked}
                        >
                            Add Text
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
AddTask.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    isAnyTasksChecked: PropTypes.bool.isRequired
}

export default AddTask