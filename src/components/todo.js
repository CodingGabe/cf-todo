import React, { useState, useEffect } from 'react';
import './todo.css';

// function set the state for tasks
// provides line through class if 'complete' is clicked
function Task({ task, index, completeTask, removeTask }) {
    return (
        <div
            className="list-item"
            style={{ textDecoration: task.completed ? "line-through" : "" }}
        >
            {task.title}

            <button className='btn btn-remove' onClick={() => removeTask(index)}>Remove</button>
            <button className='btn btn-complete' onClick={() => completeTask(index)}>Complete</button>

        </div>
    );
}

// uses hook state capture input
function CreateTask({ addTask }) {
    const [value, setValue] = useState("");

    // prevents submission and checks if there is a value and after value is added resets to blank
    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTask(value);
        setValue("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                value={value}
                placeholder="Add task and Press Enter"
                onChange={e => setValue(e.target.value)}
            />
        </form>
    );
}

// uses hooks to with default of 0 to toggle tasks
function Todo() {
    const [tasksRemaining, setTasksRemaining] = useState(0);
    const [tasks, setTasks] = useState([
        {
            title: "Apply for Cloudfare Front-End Dev Role",
            completed: true
          },
          {
            title: "Interview with Team",
            completed: true
          },
          {
            title: "Take Coding Test",
            completed: false
          },
    ]);

    // learnded this one a big to filter through and display using the useEffect hook
    useEffect(() => { setTasksRemaining(tasks.filter(task => !task.completed).length) });


    const addTask = title => {
        const newTasks = [...tasks, { title, completed: false }];
        setTasks(newTasks);
    };

    const completeTask = index => {
        const newTasks = [...tasks];
        newTasks[index].completed = true;
        setTasks(newTasks);
    };

    const removeTask = index => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };

    return (
        <div className="todo-container">
            <div className="header">Pending tasks ({tasksRemaining})</div>
            <div className="list-wrapper">
                {tasks.map((task, index) => (
                    <Task
                    task={task}
                    index={index}
                    completeTask={completeTask}
                    removeTask={removeTask}
                    key={index}
                    />
                ))}
            </div>
            <div className="create-task" >
                <CreateTask addTask={addTask} />
            </div>
        </div>
    );
}

export default Todo;