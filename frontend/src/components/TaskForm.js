import React, { useState } from 'react';

const TaskForm = ({ onSubmit, initialTask = { title: '', description: '' } }) => {
  const [task, setTask] = useState(initialTask);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={task.title}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <textarea
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">Save Task</button>
    </form>
  );
};

export default TaskForm;