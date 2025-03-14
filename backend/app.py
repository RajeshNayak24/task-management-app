from flask import Flask, jsonify, request, abort
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database initialization
def init_db():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS tasks
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  title TEXT NOT NULL,
                  description TEXT,
                  completed BOOLEAN NOT NULL CHECK (completed IN (0, 1)))''')
    conn.commit()
    conn.close()

# Initialize the database
init_db()

# Reorder IDs sequentially
def reorder_ids():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()

    # Fetch all tasks ordered by the current ID
    c.execute("SELECT * FROM tasks ORDER BY id")
    tasks = c.fetchall()

    # Update IDs sequentially
    for index, task in enumerate(tasks, start=1):
        c.execute("UPDATE tasks SET id = ? WHERE id = ?", (index, task[0]))

    # Reset the auto-increment counter
    c.execute("DELETE FROM sqlite_sequence WHERE name='tasks'")
    conn.commit()
    conn.close()

# API to get all tasks
@app.route('/tasks', methods=['GET'])
def get_tasks():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute("SELECT * FROM tasks ORDER BY id")
    tasks = c.fetchall()
    conn.close()
    tasks_with_ids = [{"id": task[0], "title": task[1], "description": task[2], "completed": task[3]} for task in tasks]
    return jsonify(tasks_with_ids)

# API to add a new task
@app.route('/tasks', methods=['POST'])
def add_task():
    if not request.json or not 'title' in request.json:
        abort(400)
    title = request.json['title']
    description = request.json.get('description', "")
    completed = request.json.get('completed', False)

    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute("INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)",
              (title, description, completed))
    conn.commit()
    task_id = c.lastrowid
    conn.close()
    return jsonify({"id": task_id, "title": title, "description": description, "completed": completed}), 201

# API to update a task
@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    if not request.json:
        abort(400)
    title = request.json.get('title')
    description = request.json.get('description')
    completed = request.json.get('completed')

    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute("UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?",
              (title, description, completed, id))
    conn.commit()
    conn.close()
    return jsonify({"id": id, "title": title, "description": description, "completed": completed})

# API to delete a task
@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute("DELETE FROM tasks WHERE id = ?", (id,))
    conn.commit()
    # Reorder the remaining IDs
    reorder_ids()
    conn.close()
    return jsonify({"status": "Task deleted"})

if __name__ == '__main__':
    app.run(debug=True)