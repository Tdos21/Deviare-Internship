const express = require('express');
const connection = require('../connection');
const { authenticateToken, authorizeRoles } = require('./authentication/services');
const router = express.Router();

// Add a new meeting (Admin only)
router.post('/api/meetings', (req, res, next) => {
    let meeting = req.body;
    const query = "INSERT INTO meetings (title, description, isUrgent, startTime, endTime) VALUES (?, ?, ?, ?, ?)";
    connection.query(query, [meeting.title, meeting.description, meeting.isUrgent, meeting.startTime, meeting.endTime], (err, results) => {
        if (!err) {
            return res.status(201).json({ message: "Meeting Added Successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

// Get all meetings (Admin and Client)
router.get('/api/meetings', (req, res, next) => {
    const query = "SELECT * FROM meetings";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

// Update a meeting (Admin only)
router.put('/api/meetings/:id', (req, res, next) => {
    let meeting = req.body;
    const query = "UPDATE meetings SET title = ?, description = ?, isUrgent = ?, startTime = ?, endTime = ? WHERE id = ?";
    connection.query(query, [meeting.title, meeting.description, meeting.isUrgent, meeting.startTime, meeting.endTime, req.params.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Meeting not found!" });
            }
            return res.status(200).json({ message: "Meeting Updated Successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

// Delete a meeting (Admin only)
router.delete('/api/meetings/:id', (req, res, next) => {
    const query = "DELETE FROM meetings WHERE id = ?";
    connection.query(query, [req.params.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Meeting not found!" });
            }
            return res.status(200).json({ message: "Meeting Deleted Successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;
