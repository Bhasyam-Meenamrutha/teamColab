import React, { useState } from 'react';
import "./index.scss"
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [assignee, setAssignee] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('Pending');

  const handleAddTask = () => {
    if (!taskName || !assignee || !deadline) return; // Prevent empty tasks
    const newTask = {
      id: Date.now(),
      taskName,
      assignee,
      deadline,
      status
    };
    setTasks([...tasks, newTask]);
    setTaskName('');
    setAssignee('');
    setDeadline('');
    setStatus('Pending');
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = id => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <h1>Team Collaboration Tool</h1>

      <div className="task-form">
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={e => setTaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assignee"
          value={assignee}
          onChange={e => setAssignee(e.target.value)}
        />
        <input
          type="date"
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="task-container">
        <div className="kanban-column">
          <h2>Pending</h2>
          {tasks.filter(task => task.status === 'Pending').map(task => (
            <div key={task.id} className="task-card">
              <h3>{task.taskName}</h3>
              <p><strong>Assignee:</strong> {task.assignee}</p>
              <p><strong>Deadline:</strong> {task.deadline}</p>
              <button onClick={() => handleStatusChange(task.id, 'In Progress')}>In Progress</button>
              <button onClick={() => handleStatusChange(task.id, 'Completed')}>Completed</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          ))}
        </div>

        <div className="kanban-column">
          <h2>In Progress</h2>
          {tasks.filter(task => task.status === 'In Progress').map(task => (
            <div key={task.id} className="task-card">
              <h3>{task.taskName}</h3>
              <p><strong>Assignee:</strong> {task.assignee}</p>
              <p><strong>Deadline:</strong> {task.deadline}</p>
              <button onClick={() => handleStatusChange(task.id, 'Completed')}>Completed</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          ))}
        </div>

        <div className="kanban-column">
          <h2>Completed</h2>
          {tasks.filter(task => task.status === 'Completed').map(task => (
            <div key={task.id} className="task-card">
              <h3>{task.taskName}</h3>
              <p><strong>Assignee:</strong> {task.assignee}</p>
              <p><strong>Deadline:</strong> {task.deadline}</p>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;