import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Fetch tasks from the backend
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  // Add a new task
  const addTask = () => {
    axios.post('http://127.0.0.1:5000/tasks', {
      title: title,
      description: description,
      completed: false
    },{
      headers: {
        'Content-Type': 'application/json' // Explicitly set the Content-Type header
      }
    })
    .then(response => {
      setTasks([...tasks, response.data]);
      setTitle('');
      setDescription('');
    })
    .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Task Management</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task[0]}>
            <h3>{task[1]}</h3>
            <p>{task[2]}</p>
            <p>{task[3] ? 'Completed' : 'Pending'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
