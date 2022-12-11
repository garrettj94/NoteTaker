const notes = require('express').Router();
const { readAndAppend } = require('../../helpers/fsUtils');
const uuid = require('../../helpers/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json.').then((data) => res.json(JSON.parse(data)));
  });
  
  // POST Route for a new note
  notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (title && text) {
      const newNote = {
        title,
        text,
        title_id: uuid(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('This note was unable to be added please try again');
    }
  });
  
  module.exports = notes;
  