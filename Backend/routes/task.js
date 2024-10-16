const express = require('express');
const connection = require('../connection');
const { authenticateToken, authorizeRoles } = require('./authentication/services');
const router = express.Router();

// Add a new task (Admin only)
router.post('/api/tasks', (req, res, next) => {
    let task = req.body;
    const query = "INSERT INTO tasks (name, description, isUrgent, startTime, endTime) VALUES (?, ?, ?, ?, ?)";
    connection.query(query, [task.name, task.description, task.isUrgent, task.startTime, task.endTime], (err, results) => {
        if (!err) {
            return res.status(201).json({ message: "Task Added Successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

// Get all tasks (Admin and Client)
router.get('/api/tasks', (req, res, next) => {
    const query = "SELECT * FROM tasks";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

// Update a task (Admin only)
router.put('/api/tasks/:id', (req, res, next) => {
    let task = req.body;
    const query = "UPDATE tasks SET name = ?, description = ?, isUrgent = ?, startTime = ?, endTime = ? WHERE id = ?";
    connection.query(query, [task.name, task.description, task.isUrgent, task.startTime, task.endTime, req.params.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Task not found!" });
            }
            return res.status(200).json({ message: "Task Updated Successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

// Delete a task (Admin only)
router.delete('/api/tasks/:id', (req, res, next) => {
    const query = "DELETE FROM tasks WHERE id = ?";
    connection.query(query, [req.params.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Task not found!" });
            }
            return res.status(200).json({ message: "Task Deleted Successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;
