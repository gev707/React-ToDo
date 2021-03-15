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
    toggleOpenModal
    }) => {
    return (
        <div className={!isChecked ? styles.taskHolder : styles.tasks}>
            <input
                className={styles.check}
                type='checkbox'
                onChange={(e) => handleToggleCheckTasks(task._id)}
                checked={isChecked}
            />
            <div className={styles.taskFlex}>
                <p>Title: {task.title}</p>
                <p>Description: {task.description}</p>
                <div>
                    <button>
                        <FontAwesomeIcon
                            onClick={() => deleteTask(task._id)}
                            icon={faTrashAlt}
                            disabled={isAnyTaskChecked}
                        />
                    </button>
                    <button>
                        <FontAwesomeIcon
                            icon={faAddressCard}
                            onClick={toggleOpenModal}
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
        title:PropTypes.string.isRequired,
        description:PropTypes.string.isRequired
    }),
    handleToggleCheckTasks:PropTypes.func,
    deleteTask:PropTypes.func.isRequired,
    isChecked:PropTypes.bool

}
export default memo(Task);