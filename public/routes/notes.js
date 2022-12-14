const note = require('express').Router();
const { title_id: uuid} = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');




// GET Route for retrieving all the notes
note.get('/notes', (req, res) => {
    readFromFile('./public/notes.html').then((data) => res.json(JSON.parse(data)));
  });

  note.post('/notes', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (title && text) {
      const newNote = {
        title,
        text,
        title_id: uuid(),
      };
  
      readAndAppend(newNote, './public/notes.html');
      res.json(`Note added successfully `);
    } else {
      res.error('This note was unable to be added please try again');
    }
  });
 


  module.exports = note;
  