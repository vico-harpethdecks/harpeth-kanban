const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error(err.message);
    console.log('Connected to the SQLite database.');
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            status TEXT DEFAULT 'To Do'
        )
    `);
});

app.get('/api/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/tasks', (req, res) => {
    const { title, description, status } = req.body;
    db.run(
        'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
        [title, description, status || 'To Do'],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            db.get('SELECT * FROM tasks WHERE id = ?', this.lastID, (err, row) => {
                res.json(row);
            });
        }
    );
});

app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    db.run(
        'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
        [title, description, status, id],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            db.get('SELECT * FROM tasks WHERE id = ?', id, (err, row) => {
                res.json(row);
            });
        }
    );
});

app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM tasks WHERE id = ?', id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(204).end();
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
