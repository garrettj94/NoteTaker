const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');





// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
  // Route for a specific note
  notes.get('/:title_id', (req, res) => {
    const noteId = req.params.title_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.title_id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      });
  });

  
// DELETE Route for a specific note
notes.delete('/:title_id', (req, res) => {
  const noteId = req.params.title_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((note) => notes.title_id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

  notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (title && text) {
      const newNote = {
        title,
        text,
        title_id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully `);
    } else {
      res.error('This note was unable to be added please try again');
    }
  });
 


  module.exports = notes;
  