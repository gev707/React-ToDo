import React from "react";
import IdGenerator from "../Todo/helpers/IdGenerators";
import Task from '../Todo/Tasks/Task';
import Modal from '../Todo/Modal/Modal'
import Confirm from '../Todo/Confirm/Confirm'
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
        isOpenModal:false,
        isOpenConfirm:false
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
    deleteAllCard = (id) => {
        let task = [...this.state.tasks];
        task = task.filter(task => task._id === id)
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
    toggleOpenConfirm = () => {
        const { isOpenConfirm } = this.state
        this.setState({
            isOpenConfirm: !isOpenConfirm
        })
    }
    render() {
        const { tasks, checkedTasks, isOpenModal,isOpenConfirm} = this.state;
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
                <div className={isOpenModal || isOpenConfirm & tasks.length===0? 'filter' : "noFilter"}>
                    <h1>This is ToDo Component</h1>
                    <div className={styles.inputHolder}>
                        <button 
                            className={styles.btnAddText} 
                            onClick={this.toggleOpenModal}
                            >Add Card Modal
                        </button>
                    </div>
                    <div className={styles.btnHolder}>
                        <button
                            onClick={this.toggleOpenConfirm}
                            className={styles.btnDeleteAll}
                            disabled={tasks.length===0}
                        >
                            Delete All Cards
                        </button>
                        <button
                            onClick={this.toggleCheckedAllTasks}
                            className={styles.btnCheckAll}
                            disabled={tasks.length===0}
                        >
                            {tasks.length === checkedTasks.size ? "Remove Checked" : "Checked All"}
                        </button>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.row}>
                            <div className={styles.textHolder}>
                                {task.length ? task : <h2>Add Some Card</h2>}
                            </div>
                        </div>
                    </div>
                </div>

                {isOpenModal && <Modal 
                    onHide={this.toggleOpenModal}
                    checkedTasks={checkedTasks}
                    addTask={this.addTask}
                />}

                {
                   isOpenConfirm && <Confirm 
                        onHide={this.toggleOpenConfirm}
                        deleteCard = {this.deleteAllCard}
                   />
                }
            </section>
        )
    }
}
export default Todo