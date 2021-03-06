import styles from "./task.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import {memo} from 'react'

const Task = ({ task, deleteTask, handleToggleCheckTasks, isChecked ,}) => {
    const handleDeleteTask = (e) => {
        deleteTask(task._id)
    }
    const handleToggleCheck = (e) => {
        handleToggleCheckTasks(task._id)
    }
    
    return (
        <div className={!isChecked ? styles.taskHolder : styles.tasks}>
            <input
                className={styles.check}
                type='checkbox'
                onChange={handleToggleCheck}
                isChecked={isChecked}
            />
            <div className={styles.taskFlex}>
                <p>{task.text}</p>
                <div>
                    <button disabled={isChecked}>
                        <FontAwesomeIcon
                            onClick={handleDeleteTask}
                            icon={faTrashAlt}
                            
                        />
                    </button>
                    <button disabled={isChecked}>
                        <FontAwesomeIcon
                            icon={faEdit}
                            
                        />
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default memo(Task);