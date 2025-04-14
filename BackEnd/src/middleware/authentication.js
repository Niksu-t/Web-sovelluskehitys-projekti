import jwt from 'jsonwebtoken';
import {selectEntriesByIds} from '../models/entry-model.js';
import 'dotenv/config';

// Authenticates token
const authenticateToken = (req, res, next) => {
  console.log('authenticateToken', req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token', token);
  // checks if token is valid if failes sends response to client
  if (token == undefined) {
    return res.sendStatus(401);
  }
  // tries to verify token. In case of failure sends response to server
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).json({message: 'invalid token'});
  }
};

// Authorization check for entries
const checkAuthEntries = async (req, res, next) => {
  // Seacrh the database for entry and check if the user_id is the same as request makers.
  try {
    const target = await selectEntriesByIds(req.params.id);
    console.log('Target entry: ', target);
    const target_user = target.user_id;
    console.log('Entrys owner id: ', target_user);
    console.log('Request maker: ', req.user.user_id);
    const admin_result = req.user.user_level;
    // Checks if the user is the one that created the entry or is an admin
    if (target_user != req.user.user_id && admin_result !== 'admin') {
      res.status(401).json({message: 'Unauthorized'});
    } else {
      next();
    }
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({message: error});
  }
};
/**
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
// Authorization check for users
const checkAuthUsers = async (req, res, next) => {
  // Setting variables for ease of use
  const userId = req.user.user_id;
  const targetId = req.params.id;
  const user_level = req.user.user_level;
  // Checks if the user is the same that they are trying to modify or is an admin
  if (userId != targetId && user_level !== 'admin') {
    res.status(401).json({message: 'Unauthorized'});
  } else {
    next();
  }
};

export {authenticateToken, checkAuthEntries, checkAuthUsers};
