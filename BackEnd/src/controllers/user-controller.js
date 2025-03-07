import bcrypt, { hash } from 'bcryptjs';
import {
  insertUser,
  selectAllUsers,
  selectUserById,
  editUser,
  deleteUser,
} from '../models/user-model.js';

// Fetch all user data
const getUsers = async (req, res) => {
  // sends data back to client without password
  const users = await selectAllUsers();
  console.log(users);
  res.json(users);
};

// Fetch user by id
const getUserById = async (req, res) => {
  console.log('getUserById', req.params.id);

  try {
    const user = await selectUserById(req.params.id);
    console.log('User found:', user);
    // if user is found, i.e., value is not undefined, send it as a response
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({message: 'User not found'});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

// Add user (registration)
// better error handling will be added later
const addUser = async (req, res) => {
  console.log('addUser request body', req.body);
  // introduce 3 new variables, which are assigned the values of the corresponding properties of req.body
  const {username, password, email} = req.body;
  let user_level = "regular";
  if (req.body.user_level) {
    user_level = req.body.user_level;
  }
  // create a hash from the plaintext password, which is stored in the database
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Create new user object with hashed password
  const newUser = {
    username,
    password: hashedPassword,
    email,
    user_level
  };
  try {
    // tries to insert user using model function
    const result = await insertUser(newUser);
    // if succeeds sends response to client
    res.status(201);
    return res.json({message: 'User added with id: ' + result});
  } catch (error) {
    // if fails logs error to console and sends response to client
    console.error(error.message);
    return res.status(400).json({message: 'DB error: ' + error.message});
  }
};

// updates user
const updateUser = async (req, res) => {
  console.log('editUser request body', req.body);
  const user_id = req.params.id;
  const {username, email, password} = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt)
  // checks if all required params are valid
  const user = {
    username,
    password : hashedPassword,
    email, 
  };
  try {
    // calls model function if succeeds sends response to client
    const response = await editUser(user_id, user);
    console.log(response);
    if (response != 0) {
      res.status(200).json({message: 'User updated'});
    } else {
      res.status(200).json({message: 'No user updated'});
    }
  } catch (error) {
    res.json({message: error});
  }
};

// Deletes user based on id
const userDelete = (req, res) => {
  console.log('deleteUser', req.params.id);
  const userId = req.params.id;
  try {
    // calls model function if succeeds sends response to client
    deleteUser(userId);
    res.json({message: 'User deleted.'});
  } catch (error) {
    // sends response to client in case of failure
    res.status(500).json({message: error.message});
  }
};

export {getUsers, getUserById, addUser, updateUser, userDelete};
