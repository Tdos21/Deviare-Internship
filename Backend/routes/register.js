const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('../connection');
const router = express.Router();

// Register a new user (Admin or Client)
router.post('/api/register', (req, res, next) => {
    let user = req.body;

    // SQL query to insert user into 'users' table
    const query = "INSERT INTO users (username, password, name, email, phone, address, role) VALUES (?, ?, ?, ?, ?, ?, ?)";

    // Hash the password before saving
    bcrypt.hash(user.password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json(err);

        // Insert into 'users' table
        connection.query(query, [user.username, hashedPassword, user.name, user.email, user.phone, user.address, user.role], (err, results) => {
            if (err) return res.status(500).json(err);

            // If the user is a client, insert their details into the 'client' table
            if (user.role === 'client') {
                const clientQuery = "INSERT INTO client (user_id, name, email, phone, address) VALUES (?, ?, ?, ?, ?)";
                const userId = results.insertId; // Get the newly inserted user ID

                connection.query(clientQuery, [userId, user.name, user.email, user.phone, user.address], (err, clientResults) => {
                    if (err) return res.status(500).json(err);

                    return res.status(201).json({ message: "Client Registered Successfully" });
                });
            } else {
                return res.status(201).json({ message: "Admin Registered Successfully" });
            }
        });
    });
});

module.exports = router;
