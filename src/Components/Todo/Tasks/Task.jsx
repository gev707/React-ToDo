import styles from "./task.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { memo } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

const Task = ({ 
    task, 
    handleToggleCheckTasks,
    deleteTask, 
    isAnyTaskChecked,
    isChecked,
    editTask 
    }) => {
    return (
        <div className={!isChecked ? styles.taskHolder : styles.tasks}>
            <input
                className={styles.check}
                type='checkbox'
                onChange={() => handleToggleCheckTasks(task._id)}
                checked={isChecked}
            />
            {console.log(isChecked)}
            <div className={styles.taskFlex}>
                <p>{task.text}</p>
                <div>
                    <button>
                        <FontAwesomeIcon
                            onClick={(e) => deleteTask(task._id)}
                            icon={faTrashAlt}
                            disabled={isAnyTaskChecked}
                        />
                    </button>
                    <button>
                        <FontAwesomeIcon
                            icon={faAddressCard}
                            onClick={()=>editTask()}
                        />
                    </button>
                </div>

            </div>
        </div>
    )
}

Task.propTypes = {
    task:PropTypes.shape({
        _id:PropTypes.string.isRequired,
        text:PropTypes.string,
    }),
    handleToggleCheckTasks:PropTypes.func,
    deleteTask:PropTypes.func,
    editTask:PropTypes.func,
    isAnyTaskChecked:PropTypes.bool,
    isChecked:PropTypes.bool.isRequired

}
export default memo(Task);