
import {
  deleteEntryByIds,
  insertEntry,
  editEntry,
  selectEntriesByUserId,
} from '../models/entry-model.js';

// Adds entry to the databse
const postEntry = async (req, res) => {
  const newEntry = req.body;
  console.log(req.body);
  newEntry.user_id = req.user.user_id;
  try {
    // calls the model function to insert the entry to the database
    await insertEntry(newEntry);
  } catch (error) {
    // catches error and logs it to console for easier troubleshootting
    console.error(error);
    res.status(500).json({message: 'Database error'});
  }
  // sends response to the client
  res.status(201).json({message: 'Entry added.'});
};

/**
 * Get all entries of the logged in user
 * @param {*} req
 * @param {*} res
 */
const getOwnEntries = async (req, res) => {
  const entries = await selectEntriesByUserId(req.user.user_id);
  res.json(entries);
};
// Gets entries for selected user
const getEntriesById = async (req, res) => {
  const entries = await selectEntriesByUserId(req.params.id);
  res.json(entries);
};

// Updates entry by id
const updateEntry = async (req, res) => {
  console.log('Edit entry', req.params.id);
  const entryId = req.params.id;
  const entry = req.body;
  try {
    // calls model function to edit the entry
    const response = await editEntry(entryId, entry);
    if (response != 0) {
      res.status(200).json({message: "Entry updated"});
    } else{
      res.status(200).json({message: "No Entry updated"});
    }
  } catch (error) {
    // catches error and logs it to console for easier troubleshootting
    console.error(error);
    res.status(500).json({message: 'Database error'});
  };
  
};

// Deletes entry by id
const deleteEntry = async (req, res) => {
  console.log('Delete entry', req.params.id);
  const entryId = req.params.id;
  try {
    // Calls model function to delete the entry
    await deleteEntryByIds(entryId);
  } catch (error) {
    // // catches error and logs it to console for easier troubleshootting
    console.error(error);
    res.status(500).json({message: 'Database error'});
  }
   // sends response to client
   res.status(204).json({message:"Entry deleted"});
};
export {postEntry, getOwnEntries, updateEntry, deleteEntry, getEntriesById};
