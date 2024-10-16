import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function TodoList() {
    const [task, setTask] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const tasks = useSelector(state => state.todo.tasks);
    const dispatch = useDispatch();

    const addTask = () => {
        if (editIndex !== null) {
            dispatch({ type: 'EDIT_TASK', payload: { index: editIndex, text: task } });
            setEditIndex(null);
        } else {
            dispatch({ type: 'ADD_TASK', payload: { text: task, completed: false } });
        }
        setTask('');
    };

    const editTask = (index) => {
        setTask(tasks[index].text);
        setEditIndex(index);
    };

    const toggleTask = (index) => {
        dispatch({ type: 'TOGGLE_TASK', payload: index });
    };

    const deleteTask = (index) => {
        dispatch({ type: 'DELETE_TASK', payload: index });
        if (editIndex === index) {
            setEditIndex(null);
            setTask('');
        } else if (editIndex !== null && index < editIndex) {
            setEditIndex(editIndex - 1);
        }
    };

    return (
        <div className="todo-list">
            <h2>Danh sách công việc</h2>
            <div className="todo-input">
                <input 
                    value={task} 
                    onChange={(e) => setTask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                    placeholder="Nhập công việc mới"
                />
                <button onClick={addTask}>{editIndex !== null ? 'Sửa' : 'Thêm'}</button>
            </div>
            <ul className="todo-items">
                {tasks.map((t, index) => (
                    <li key={index} className={t.completed ? 'completed' : ''}>
                        <div className="todo-item-content">
                            <input 
                                type="checkbox" 
                                checked={t.completed} 
                                onChange={() => toggleTask(index)} 
                            />
                            <span>{t.text}</span>
                        </div>
                        <div className="todo-item-actions">
                            <button onClick={() => editTask(index)}>Sửa</button>
                            <button onClick={() => deleteTask(index)}>Xóa</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
