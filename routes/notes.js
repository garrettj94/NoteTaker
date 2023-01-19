const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');
// const data = require('./db/db.json')




// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  // // Route for a specific note
  // notes.get('/:title', (req, res) => {
  //   const noteId = req.params.title;
  //   readFromFile('./db/db.json')
  //     .then((data) => JSON.parse(data))
  //     .then((json) => {
  //       const result = json.filter((note) => note.title === noteId);
  //       return result.length > 0
  //         ? res.json(result)
  //         : res.json('No note with that ID');
  //     });
  // });

  
// DELETE Route for a specific note
notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = json.filter((notes) => notes.id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);
      console.log(noteId)
      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

  notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        id: uuidv4(),
        title,
        text,
        
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully `);
    } else {
      res.error('This note was unable to be added please try again');
    }
  });
 


  module.exports = notes;
  