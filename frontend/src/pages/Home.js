// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { fetchTasks, addTask, updateTask, deleteTask } from '../services/api';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks().then((data) => {
      console.log('Fetched tasks:', data); // Debugging: Log fetched tasks
      setTasks(data);
    });
  }, []);

  const handleAddTask = (task) => {
    addTask(task).then((newTask) => {
      console.log('Added task:', newTask); // Debugging: Log added task
      setTasks([...tasks, newTask]);
    });
  };

  const handleEditTask = (task) => {
    updateTask(task).then((updatedTask) => {
      console.log('Updated task:', updatedTask); // Debugging: Log updated task
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    });
    setEditingTask(null);
  };

  const handleDeleteTask = (id) => {
    deleteTask(id).then(() => {
      console.log('Deleted task with ID:', id); // Debugging: Log deleted task
      setTasks(tasks.filter((t) => t.id !== id));
    });
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Task Management</h1>
      <TaskForm
        onSubmit={editingTask ? handleEditTask : handleAddTask}
        initialTask={editingTask || { title: '', description: '' }}
      />
      <TaskList
        tasks={tasks}
        onEdit={setEditingTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default Home;