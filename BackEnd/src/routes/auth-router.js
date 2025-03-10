import express from 'express';
import {getMe, login} from '../controllers/auth-controller.js';
import {authenticateToken} from '../middleware/authentication.js';
const authRouter = express.Router();

/**
 * @apiDefine all No authentication needed.
 */
/**
 * @apiDefine token Logged in user access only
 * Valid authentication token must be provided within request.
 */
/**
 * @apiDefine UnauthorizedError
 * @apiError UnauthorizedError Unauthorized access.
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 Unauthorized
 * {
 * "message": "Unauthorized"
 * }
 */
/**
 * @api {post} /auth/login Login
 * @apiVersion 1.0.0
 * @apiName PostLogin
 * @apiGroup Authentication
 * @apiPermission all
 *
 * @apiDescription Sign in and get an authentication token for the user.
 *
 * @apiBody {String} username Username of the user.
 * @apiBody {String} password Password of the user.
 *
 * @apiParamExample {json} Request-Example:
 * {
 * "username": "johnd",
 * "password": "examplepass"
 * }
 *
 * @apiSuccess {String} token Token for the user authentication.
 * @apiSuccess {Object} user User info.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "message": "login ok",
 * "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMSwidXNlcm5hbWUiOiJ1dXNpMSIsImVtYWlsIjoidXVzaTFAZXhhbXBsZS5jb20iLCJ1c2VyX2xldmVsX2lkIjoyLCJpYXQiOjE3MDEyNzkzMjJ9.3TbVTcXSdryTDm_huuXC_U1Lg4rL0SOFyn_WAsC6W0Y",
 * "user": {
 * "user_id": 21,
 * "username": "johnd",
 * "email": "johnd@example.com",
 * "user_level": "regular"
 * }
 * }
 *
 * @apiError UnauthorizedError Bad username/password.
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 Unauthorized
 * {
 * "message": "Bad username/password."
 * }
 */
authRouter.post('/login', login);

/**
 * @api {get} /auth/me Request information about current user
 * @apiVersion 1.0.0
 * @apiName GetMe
 * @apiGroup Authentication
 * @apiPermission token
 * @apiHeader {String} Authorization Bearer token.
 *
 * @apiSuccess {Object} user User info.
 * @apiSuccess {Number} user.user_id Id of the User.
 * @apiSuccess {String} user.username Username of the User.
 * @apiSuccess {String} user.email email of the User.
 * @apiSuccess {Number} user.user_level User level of user 
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 * "user_id": 21,
 * "username": "johnd",
 * "email": "johnd@example.com",
 * "user_level": example,
 * }
 *
 * @apiError UnauthorizedError Unauthorized access.
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 Unauthorized
 * {
 * "message": "Unauthorized"
 * }
 */
authRouter.get('/me', authenticateToken, getMe);

export default authRouter;
