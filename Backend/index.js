const express = require('express');
var cors = require('cors');
const connection  = require('./connection');
const appuserRoute = require('./routes/appuser');
const clientRoute = require('./routes/client');
const meetingRoute = require('./routes/meeting');
const projectRoute = require('./routes/project');
const taskRoute = require('./routes/task');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/appuser',appuserRoute);
app.use('/client',clientRoute);
app.use('/meeting',meetingRoute);
app.use('/project',projectRoute);
app.use('/task',taskRoute);

module.exports = app;