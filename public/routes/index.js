const express = require('express');

// Import our modular routers for /notes
const notesRouter = require('./notes');

const app = express();

app.use(notesRouter);


module.exports = app;
