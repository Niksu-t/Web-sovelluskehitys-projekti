import express from 'express';
import {
  userDelete,
  updateUser,
  getUserById,
  getUsers,
  addUser,
} from '../controllers/user-controller.js';
import {
  authenticateToken,
  checkAuthUsers,
} from '../middleware/authentication.js';
import {body} from 'express-validator';
import {validationErrorHandler} from '../middleware/error-handler.js';
const userRouter = express.Router();

// all routes to /api/users
/**
 * @api {get} /api/users Get all users
 * @apiVersion 1.0.0
 * @apiName GetUsers
 * @apiGroup Users
 * @apiPermission token
 *
 * @apiDescription Fetch the list of all users. Only logged in users can access this route.
 *
 * @apiSuccess {Object[]} users List of users.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * [
 * {
 * "user_id": 1,
 * "username": "johnd",
 * "email": "johnd@example.com",
 * "user_level": "regular"
 * },
 * ...
 * ]
 *
 * @apiError UnauthorizedError Unauthorized access.
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 Unauthorized
 * {
 * "message": "Unauthorized"
 * }
 */
userRouter
  .route('/')
  .get(authenticateToken, getUsers)
  /**
   * @api {post} /api/users Add a new user
   * @apiVersion 1.0.0
   * @apiName AddUser
   * @apiGroup Users
   * @apiPermission all
   *
   * @apiDescription Add a new user to the system.
   *
   * @apiBody {String} username Username of the user. Must be 3-20 characters long and alphanumeric.
   * @apiBody {String} password Password of the user. Minimum length is 8 characters.
   * @apiBody {String} email Email address of the user. Must be a valid email address.
   * @apiBody {String} [user_level] User level of the user. Optional.
   *
   * @apiParamExample {json} Request-Example:
   * {
   * "username": "johnd",
   * "password": "examplepass",
   * "email": "johnd@example.com",
   * "user_level": "regular"
   * }
   *
   * @apiSuccess {Object} user User info.
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 201 Created
   * {
   * "message": "User added with id: 1",
   * "user": {
   * "user_id": 1,
   * "username": "johnd",
   * "email": "johnd@example.com",
   * "user_level": "regular"
   * }
   * }
   *
   * @apiUse UnauthorizedError
   */
  .post(
    body('username', 'username must be 3-20 characters long and alphanumeric')
      .trim()
      .isLength({min: 3, max: 20})
      .isAlphanumeric(),
    body('password', 'minimum password length is 8 characters')
      .trim()
      .isLength({min: 8}),
    body('email', 'must be a valid email address').trim().isEmail(),
    body('user_level').trim().optional(),
    validationErrorHandler,
    addUser,
  );

// all routes to /api/users/:id
/**
 * @api {get} /api/users/:id Get user by ID
 * @apiVersion 1.0.0
 * @apiName GetUserById
 * @apiGroup Users
 * @apiPermission all
 *
 * @apiDescription Fetch a user by their ID.
 *
 * @apiSuccess {Object} user User info.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "user_id": 1,
 * "username": "johnd",
 * "email": "johnd@example.com",
 * "user_level": "regular"
 * }
 *
 * @apiUse UnauthorizedError
 */
userRouter
  .route('/:id')
  .get(getUserById)
  /**
   * @api {put} /api/users/:id Update user
   * @apiVersion 1.0.0
   * @apiName UpdateUser
   * @apiGroup Users
   * @apiPermission token
   *
   * @apiDescription Update user information. Only the authenticated user or an admin can update user info.
   *
   * @apiBody {String} username Username of the user. Must be 3-20 characters long and alphanumeric.
   * @apiBody {String} password Password of the user. Minimum length is 8 characters.
   * @apiBody {String} email Email address of the user. Must be a valid email address.
   * @apiBody {String} [user_level] User level of the user. Optional.
   *
   * @apiParamExample {json} Request-Example:
   * {
   * "username": "johnd",
   * "password": "newpassword",
   * "email": "johnd@example.com",
   * "user_level": "admin"
   * }
   *
   * @apiSuccess {Object} user Updated user info.
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   * message: User updated
   * }
   *
   * @apiUse UnauthorizedError
   */
  .put(
    body('username', 'username must be 3-20 characters long and alphanumeric')
      .trim()
      .isLength({min: 3, max: 20})
      .isAlphanumeric(),
    body('password', 'minimum password length is 8 characters')
      .trim()
      .isLength({min: 8}),
    body('email', 'must be a valid email address').trim().isEmail(),
    body('user_level').trim().optional(),
    authenticateToken,
    checkAuthUsers,
    updateUser,
  )
  /**
   * @api {delete} /api/users/:id Delete user
   * @apiVersion 1.0.0
   * @apiName DeleteUser
   * @apiGroup Users
   * @apiPermission token
   *
   * @apiDescription Delete a user by their ID. Only the authenticated user or an admin can delete a user.
   *
   * @apiSuccess {String} message Success message.
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   * "message": "User deleted."
   * }
   *
   * @apiUse UnauthorizedError
   */
  .delete(authenticateToken, checkAuthUsers, userDelete);

export default userRouter;
