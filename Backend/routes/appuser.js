const express = require('express');
const connection = require('../connection');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');
require('dotenv').config();
var auth = require('./authentication/services');

router.post('/api/addNewAppUser', (req, res) => {
   try {
       let user = req.body;
       let query = "select email,password,status from appuser where email=?";
       connection.query(query, [user.email], (err, results) => {
           if (!err) {
               if (results.length <= 0) {
                   query = "insert into appuser(name, email, password, status, isDeletable) values(?,?,?,'false','true')";
                   connection.query(query, [user.name, user.email, user.password], (err, results) => {
                       if (!err) {
                           return res.status(200).json({ message: "Successfully Registered" });
                       } else {
                           return res.status(500).json(err);
                       }
                   });
               } else {
                   return res.status(400).json({ message: "This user already exists" });
               }
           } else {
               return res.status(500).json(err);
           }
       });
   } catch (error) {
       return res.status(500).json({ error: "Server Error", details: error.message });
   }
});



router.post('/api/login', (req, res) => {
    const user = req.body;

    // Validate the request body
    if (!user.email || !user.password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const query = "SELECT email, password, status, isDeletable FROM appuser WHERE email=?";
    
    connection.query(query, [user.email], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (results.length <= 0 || results[0].password !== user.password) {
            return res.status(401).json({ message: "Incorrect Email or Password" });
        } 
        
        if (results[0].status === 'false') {
            return res.status(401).json({ message: "Wait for admin approval" });
        } 

        // Password matched, proceed to create JWT
        const response = {
            email: results[0].email,
            isDeletable: results[0].isDeletable
        };

        // Use your secret key stored in environment variables for JWT
        const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '2h' });

        return res.status(200).json({ token: accessToken });
    });
});


router.get('/api/getAllAppusers', auth.authenticateToken, (req, res) => {
    const tokenPayload = req.body;
    
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Invalid or empty JSON body' });
      } // Assuming `auth.authenticateToken` adds the payload to `req.user`
    
    let query;

    // Ensure that tokenPayload is defined and check for isDeletable
    if (tokenPayload && tokenPayload.isDeletable=== 'false') {
        query = "select * from appuser order by name";
    } else {
        // Optional: If you want to allow all users if isDeletable is true or not provided
        query = "SELECT id, name, email, status FROM appuser"; 
    }

    connection.query(query, [tokenPayload.email], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        // Respond with the results
        return res.status(200).json(results);
    });
})

router.post('/api/UpdateUserStatus', auth.authenticateToken, (req,res)=>{
    let user = req.body;
    var query = "UPDATE appuser SET status=? WHERE id=? AND isDeletable='true'";
    connection.query(query,[user.status, user.id],(err,results)=>{
        if(!err){
             if(results.affectedRows == 0){
               return res.status(404).json({message:"Appuser ID does not exits"});
             }
             return res.status(200).json({message:"Appuser updated successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.post('/api/updateUser', auth.authenticateToken, (req,res)=>{
    let user = req.body;
    var query = "UPDATE appuser SET name=? status=? WHERE id=?";
    connection.query(query,[user.name, user.email, user.id],(err,results)=>{
        if(!err){
             if(results.affectedRows == 0){
               return res.status(404).json({message:"Appuser ID does not exits"});
             }
             return res.status(200).json({message:"Appuser updated successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})  

router.get('/api/checkToken',auth.authenticateToken,(req,res)=>{
    return res.status(200).json({message:"true"});
})
module.exports = router; // Export the router
