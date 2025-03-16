import React from 'react';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="list-group">
      {tasks.map((task) => (
        <div key={task.id} className="list-group-item mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5>{task.title}</h5>
              <p>{task.description}</p>
            </div>
            <div>
              <button className="btn btn-warning me-2" onClick={() => onEdit(task)}>Edit</button>
              <button className="btn btn-danger" onClick={() => onDelete(task.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;