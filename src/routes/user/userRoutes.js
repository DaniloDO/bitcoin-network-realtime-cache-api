// import all necessary dependencies and layers
import express from "express" ;
import userModel from "../../database/models/userModel.js"
import UserRepository from "../../repositories/user/userRepository.js";
import UserService from "../../services/user/userService.js";
import UserController from "../../controllers/user/userController.js";
import standardData from "../../middlewares/user/userStandardData.js";

const userRouter = express.Router();

// Instantiate the repository, service and controller layer
const userRepository = new UserRepository(userModel); 
const userService = new UserService(userRepository); 
const userController = new UserController(userService); 

// Route to create new user
userRouter.post('/create-user', (req, res) => userController.createUser(req, res)); 

// Route to get user by email 
userRouter.get('/user-email/:userEmail', (req, res) => userController.getUserByEmail(req, res)); 

// Route to get user by id
userRouter.get('/user-id/:userId', (req, res) => userController.getUserById(req, res)); 

// Route to get all users
userRouter.get('/all', (req, res) => userController.getAllUsers(req, res));

// Route to update user 
userRouter.put('/update-user/:userId', standardData, (req, res) => userController.updateUser(req, res)); 

// Route to delete user 
userRouter.delete('/delete-user/:userId', (req, res) => userController.deleteUser(req, res)); 

// Route to login user 
userRouter.post('/login', (req, res) =>  userController.loginUser(req, res));

// Route to logout user 
userRouter.post('/logout', (req, res) => userController.logoutUser(req, res)); 

export default userRouter; 