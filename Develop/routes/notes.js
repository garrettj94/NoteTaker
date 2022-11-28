const notes = require('express').Router();
const { readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the tips
tips.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
  
  // POST Route for a new note
  notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { name, topic, tip } = req.body;
  
    if (req.body) {
      const newTip = {
        name,
        tip,
        topic,
        tip_id: uuid(),
      };
  
      readAndAppend(newTip, './db/tips.json');
      res.json(`Tip added successfully 🚀`);
    } else {
      res.error('Error in adding tip');
    }
  });
  
  module.exports = tips;
  