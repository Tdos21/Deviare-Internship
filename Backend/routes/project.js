const express = require('express');
// const { authenticateToken, authorizeRoles } = require('./authentication/services');
const connection = require('../connection');
const router = express.Router();

// Only Admins can perform full CRUD on projects

// Add a new project (Admin only)
router.post('/api/projects', (req, res, next) => {
    let project = req.body;
    const query = "INSERT INTO projects (name, duration, startTime, endTime, description) VALUES (?, ?, ?, ?, ?)";
    connection.query(query, [project.name, project.duration, project.startTime, project.endTime, project.description], (err, results) => {
        if (!err) {
            return res.status(201).json({ message: "Project Added Successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

// Get all projects (Admin and Client)
router.get('/api/projects', (req, res, next) => {
    const query = "SELECT * FROM projects";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

// Update a project (Admin only)
router.put('/api/projects/:id', (req, res, next) => {
    let project = req.body;
    const query = "UPDATE projects SET name = ?, duration = ?, startTime = ?, endTime = ?, description = ? WHERE id = ?";
    connection.query(query, [project.name, project.duration, project.startTime, project.endTime, project.description, req.params.id], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Project Updated Successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

// Delete a project (Admin only)
router.delete('/api/projects/:id', (req, res, next) => {
    const query = "DELETE FROM projects WHERE id = ?";
    connection.query(query, [req.params.id], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Project Deleted Successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;
