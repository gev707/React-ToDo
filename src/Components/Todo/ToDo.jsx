import React from "react";
import AddTask from "../Todo/AddTask/AddTask";
import IdGenerator from "../Todo/helpers/IdGenerators";
import Task from '../Todo/Tasks/Task';
import Modal from '../Todo/Modal/Modal'
import styles from "./todo.module.css";

class Todo extends React.Component {
    state = {
        tasks: [
            {
                _id: IdGenerator(),
                text: 'Card-1',
            },
            {
                _id: IdGenerator(),
                text: 'Card-2',
            },
            {
                _id: IdGenerator(),
                text: 'Card-3',
            },
        ],
        checkedTasks: new Set(),
    };
    addTask = (inputValue) => {
        const task = [...this.state.tasks];
        if (inputValue !== '') {
            task.push({
                text: inputValue,
                _id: IdGenerator()
            });
            this.setState({
                tasks: task,
            });
        } else {
            alert('Write SomeThing')
        }
    }
    deleteTask = (id) => {
        let task = [...this.state.tasks];
        task = task.filter(task => task._id !== id)
        this.setState({
            tasks: task
        })
    }
    handleToggleCheckTasks = (id) => {
        const checkedTasks = this.state.checkedTasks;
        if (!checkedTasks.has(id)) checkedTasks.add(id);
        else checkedTasks.clear(id);
        this.setState({
            checkedTasks
        })
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
        let {tasks} = this.state;
        let checkedTasks = this.state.checkedTasks;
        if(tasks.length === checkedTasks.size) checkedTasks.clear();
        else tasks.forEach(task=> {
                checkedTasks.add(task._id);
            })
        this.setState({
            checkedTasks
        })    
    }
    editTask =()=>{
        const {isOpen} = this.state
        this.setState({
            isOpen:!isOpen
        })
    }
    render() {
        const { tasks, checkedTasks,isOpen } = this.state;
        const task = tasks.map(task => {
            return <Task
                task={task}
                key={task._id}
                deleteTask={this.deleteTask}
                handleToggleCheckTasks={this.handleToggleCheckTasks}
                isAnyTaskChecked={checkedTasks.size}
                isChecked={checkedTasks.has(task._id)}
                editTask={this.editTask}
            />
        });
        return (
            <section className={!isOpen?'fliter':"notFilter"}>
                <AddTask
                    checkedTasks={checkedTasks}
                    deleteCheckedTasks={this.deleteCheckedTasks}
                    addTask={this.addTask}
                    isAnyTaskChecked={!!checkedTasks.size}
                />
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
                        {tasks.length === checkedTasks.size ? "Remove Checked": "Checked All"}
                    </button>
                </div>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.textHolder}>
                            {task.length ? task : <h2>Add Some Task</h2>}
                        </div>
                    </div>
                </div>
                <Modal 
                    isOpen={isOpen}
                    editTask={this.editTask}
                />
            </section>
        )
    }
}
export default Todo