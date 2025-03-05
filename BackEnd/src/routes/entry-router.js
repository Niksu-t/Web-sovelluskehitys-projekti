import express from 'express';
import {body} from "express-validator";
import {
  getOwnEntries,
  postEntry,
  updateEntry,
  deleteEntry,
  getEntriesById,
} from '../controllers/entry-controller.js';
import {authenticateToken, checkAuthEntries} from '../middleware/authentication.js';
import { validationErrorHandler } from '../middleware/error-handler.js';

const entryRouter = express.Router();

// post to /api/entries
entryRouter
  .route('/')
  .post(
     authenticateToken,
     body('entry_date', 'must be a date eg. 2025-02-25').trim().isDate(),
     body('mood').trim().optional().isLength({max: 20}),
     body('weight').trim().optional().isFloat({gt: 30, lt: 200}),
     body('sleep_hours').trim().optional().isInt({gt: 0, lt: 24}),
     body('notes').optional().isLength({max : 1000}),
     validationErrorHandler,  
     postEntry)
  .get(authenticateToken, getOwnEntries);
entryRouter
  .route('/:id')
  .get(authenticateToken, checkAuthEntries, getEntriesById)
  .delete(authenticateToken, checkAuthEntries, deleteEntry)
  .put(authenticateToken, checkAuthEntries, updateEntry);
export default entryRouter;
