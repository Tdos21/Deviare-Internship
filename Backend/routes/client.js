const express = require('express');
const connection = require('../connection');
const router = express.Router();  // Fixed typo: 'Route' to 'Router'
var auth = require('./authentication/services');
const { authenticateToken } = require('./authentication/services');

// Add a new client
// Updated API endpoint without authentication
router.post('/api/addNewClient', (req, res, next) => {
    let client = req.body;
    const query = "INSERT INTO clients (fullName, email, phoneNumber, address) VALUES (?, ?, ?, ?)";
    
    connection.query(query, [client.fullName, client.email, client.phoneNumber, client.address], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Client Added Successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});


// Get all clients
router.get('/api/getAllClients', (req, res, next) => {
    const query = "SELECT * FROM clients ORDER BY fullName";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

// Update a client
router.put('/api/updateClient', (req, res, next) => {
    let client = req.body;
    const query = "UPDATE clients SET fullName = ?, email = ?, phoneNumber = ?, address = ? WHERE id = ?";
    connection.query(query, [client.name, client.email, client.phone,client.address, client.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Client ID was not found!" });
            }
            return res.status(200).json({ message: "Client Updated Successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

// Delete a client
router.delete('/api/deleteClient/:id', (req, res, next) => {
    const clientId = req.params.id;
    const query = "DELETE FROM clients WHERE id = ?";
    connection.query(query, [clientId], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Client ID was not found!" });
            }
            return re
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            s.status(200).json({ message: "Client Deleted Successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

module.exports = router;  // Fixed typo: 'module.export' to 'module.exports'
