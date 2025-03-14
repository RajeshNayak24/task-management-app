from flask import Flask, jsonify, request, abort
from flask_cors import CORS
import sqlite3

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

# Route for the root URL
@app.route('/')
def home():
    return "Welcome to the Task Management API!"

# API to get all tasks
@app.route('/tasks', methods=['GET'])
def get_tasks():
    conn = sqlite3.connect('tasks.db')
    c = conn.cursor()
    c.execute("SELECT * FROM tasks")
    tasks = c.fetchall()
    conn.close()
    return jsonify(tasks)

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
    conn.close()
    return jsonify({'status': 'Task added'}), 201

if __name__ == '__main__':
    app.run(debug=True)