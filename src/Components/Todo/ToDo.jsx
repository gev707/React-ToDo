import React from "react";
import IdGenerator from "../Todo/helpers/IdGenerators";
import Task from '../Todo/Tasks/Task';
import Modal from '../Todo/Modal/Modal'
import styles from "./todo.module.css";

class Todo extends React.Component {
    state = {
        tasks: [
            {
                _id: IdGenerator(),
                title: 'Card-1',
                description: 'Card-1'
            },
            {
                _id: IdGenerator(),
                title: 'Card-2',
                description: 'Card-2'
            },
            {
                _id: IdGenerator(),
                title: 'Card-3',
                description: 'Card-3'
            },
        ],
        checkedTasks: new Set(),
        isOpenModal:false
    };
    addTask = (formData) => {
        const task = [...this.state.tasks];
        task.push({
            ...formData,
            _id: IdGenerator()
        });
        this.setState({
            tasks: task,
        });

    }
    deleteTask = (id) => {
        let task = [...this.state.tasks];
        task = task.filter(task => task._id !== id)
        this.setState({
            tasks: task
        })
    }
    handleToggleCheckTasks = (_id) => {
        let checkedTasks = new Set(this.state.checkedTasks)
        if (!checkedTasks.has(_id)) checkedTasks.add(_id);
        else checkedTasks.delete(_id);
        this.setState({
            checkedTasks
        });
    }
    deleteCheckedTasks = () => {
        let tasks = this.state.tasks;
        let checkedTasks = this.state.checkedTasks;
        tasks = tasks.filter(task => !checkedTasks.has(task._id));
        this.setState({
            tasks,
            checkedTasks: new Set()
        })
    }
    toggleCheckedAllTasks = () => {
        let { tasks } = this.state;
        let checkedTasks = this.state.checkedTasks;
        if (tasks.length === checkedTasks.size) checkedTasks.clear();
        else tasks.forEach(task => {
            checkedTasks.add(task._id);
        })
        this.setState({
            checkedTasks
        })
    }
    toggleOpenModal = () => {
        const { isOpenModal } = this.state
        this.setState({
            isOpenModal: !isOpenModal
        })
    }
    render() {
        const { tasks, checkedTasks, isOpenModal} = this.state;
        const task = tasks.map(task => {
            return <Task
                task={task}
                key={task._id}
                deleteTask={this.deleteTask}
                handleToggleCheckTasks={this.handleToggleCheckTasks}
                isAnyTaskChecked={checkedTasks.size}
                isChecked={checkedTasks.has(task._id)}
                toggleOpenModal={this.toggleOpenModal}
            />
        });
        return (
            <section className='container'>
                <div className={isOpenModal ? 'filter' : "noFilter"}>
                    <h1>This is ToDo Component</h1>
                    <div className={styles.inputHolder}>
                        <button 
                            className={styles.btnAddText} 
                            onClick={this.toggleOpenModal}
                            >Add Task Modal
                        </button>
                    </div>
                    <div className={styles.btnHolder}>
                        <button
                            onClick={this.deleteCheckedTasks}
                            className={styles.btnDeleteAll}
                            disabled={!checkedTasks.size}
                        >
                            Delete Checked
                        </button>
                        <button
                            onClick={this.toggleCheckedAllTasks}
                            className={styles.btnCheckAll}
                        >
                            {tasks.length === checkedTasks.size ? "Remove Checked" : "Checked All"}
                        </button>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.row}>
                            <div className={styles.textHolder}>
                                {task.length ? task : <h2>Add Some Task</h2>}
                            </div>
                        </div>
                    </div>
                </div>

                {isOpenModal && <Modal 
                    onHide={this.toggleOpenModal}
                    checkedTasks={checkedTasks}
                    addTask={this.addTask}
                />}
            </section>
        )
    }
}
export default Todo