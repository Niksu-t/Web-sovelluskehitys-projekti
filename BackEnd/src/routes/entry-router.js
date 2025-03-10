import express from 'express';
import {body} from 'express-validator';
import {
  getOwnEntries,
  postEntry,
  updateEntry,
  deleteEntry,
  getEntriesById,
} from '../controllers/entry-controller.js';
import {
  authenticateToken,
  checkAuthEntries,
} from '../middleware/authentication.js';
import {validationErrorHandler} from '../middleware/error-handler.js';
const entryRouter = express.Router();

/**
 * @api {post} /api/entries Add a new entry
 * @apiVersion 1.0.0
 * @apiName PostEntry
 * @apiGroup Entries
 * @apiPermission token
 *
 * @apiDescription Add a new entry to the system. Only logged in users can add entries.
 *
 * @apiBody {String} entry_date Date of the entry. Must be a valid date (e.g., 2025-02-25).
 * @apiBody {String} [mood] Mood of the user. Optional, max length 20 characters.
 * @apiBody {Number} [weight] Weight of the user. Optional, must be between 30 and 200.
 * @apiBody {Number} [sleep_hours] Sleep hours of the user. Optional, must be between 0 and 24.
 * @apiBody {String} [notes] Additional notes. Optional, max length 1000 characters.
 *
 * @apiParamExample {json} Request-Example:
 * {
 * "entry_date": "2025-02-25",
 * "mood": "happy",
 * "weight": 70,
 * "sleep_hours": 8,
 * "notes": "Had a great day!"
 * }
 *
 * @apiSuccess {Object} entry Entry info.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 201 Created
 * {
 * "message": "Entry added.",
 * }
 *
 * @apiUse UnauthorizedError
 */
entryRouter
  .route('/')
  .post(
    authenticateToken,
    body('entry_date', 'must be a date eg. 2025-02-25').trim().isDate(),
    body('mood').trim().optional().isLength({max: 20}),
    body('weight').trim().optional().isFloat({gt: 30, lt: 200}),
    body('sleep_hours').trim().optional().isInt({gt: 0, lt: 24}),
    body('notes').optional().isLength({max: 1000}),
    validationErrorHandler,
    postEntry,
  )
  /**
   * @api {get} /api/entries Get own entries
   * @apiVersion 1.0.0
   * @apiName GetOwnEntries
   * @apiGroup Entries
   * @apiPermission token
   *
   * @apiDescription Fetch the list of entries for the logged-in user.
   *
   * @apiSuccess {Object[]} entries List of entries.
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * [
   * {
   * "entry_id": 1,
   * "entry_date": "2025-02-25",
   * "mood": "happy",
   * "weight": 70,
   * "sleep_hours": 8,
   * "notes": "Had a great day!"
   * },
   * ...
   * ]
   *
   * @apiUse UnauthorizedError
   */
  .get(authenticateToken, getOwnEntries);

entryRouter
  .route('/:id')
  /**
   * @api {get} /api/entries/:id Get entry by ID
   * @apiVersion 1.0.0
   * @apiName GetEntriesById
   * @apiGroup Entries
   * @apiPermission token
   *
   * @apiDescription Fetch an entry by its ID. Only the authenticated user can access this route.
   *
   * @apiSuccess {Object} entry Entry info.
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   * "entry_id": 1,
   * "entry_date": "2025-02-25",
   * "mood": "happy",
   * "weight": 70,
   * "sleep_hours": 8,
   * "notes": "Had a great day!"
   * }
   *
   * @apiUse UnauthorizedError
   */
  .get(authenticateToken, checkAuthEntries, getEntriesById)
  /**
   * @api {delete} /api/entries/:id Delete entry
   * @apiVersion 1.0.0
   * @apiName DeleteEntry
   * @apiGroup Entries
   * @apiPermission token
   *
   * @apiDescription Delete an entry by its ID. Only the authenticated user can delete an entry.
   *
   * @apiSuccess {String} message Success message.
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   * "message": "Entry deleted."
   * }
   *
   * @apiUse UnauthorizedError
   */
  .delete(authenticateToken, checkAuthEntries, deleteEntry)
  /**
   * @api {put} /api/entries/:id Update entry
   * @apiVersion 1.0.0
   * @apiName UpdateEntry
   * @apiGroup Entries
   * @apiPermission token
   *
   * @apiDescription Update entry information. Only the authenticated user can update an entry.
   *
   * @apiBody {String} entry_date Date of the entry. Must be a valid date (e.g., 2025-02-25).
   * @apiBody {String} [mood] Mood of the user. Optional, max length 20 characters.
   * @apiBody {Number} [weight] Weight of the user. Optional, must be between 30 and 200.
   * @apiBody {Number} [sleep_hours] Sleep hours of the user. Optional, must be between 0 and 24.
   * @apiBody {String} [notes] Additional notes. Optional, max length 1000 characters.
   *
   * @apiParamExample {json} Request-Example:
   * {
   * "entry_date": "2025-02-25",
   * "mood": "happy",
   * "weight": 70,
   * "sleep_hours": 8,
   * "notes": "Had a great day!"
   * }
   *
   * @apiSuccess {Object} entry Updated entry info.
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   * "message": "Entry updated",
   * }
   *
   * @apiUse UnauthorizedError
   */
  .put(
    authenticateToken,
    body('entry_date', 'must be a date eg. 2025-02-25').trim().isDate(),
    body('mood').trim().optional().isLength({max: 20}),
    body('weight').trim().optional().isFloat({gt: 30, lt: 200}),
    body('sleep_hours').trim().optional().isInt({gt: 0, lt: 24}),
    body('notes').optional().isLength({max: 1000}),
    validationErrorHandler,
    checkAuthEntries,
    updateEntry,
  );

export default entryRouter;
