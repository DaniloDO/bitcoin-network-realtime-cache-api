import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"; 

dotenv.config();

// UserService class responsible for business logic implemented in user data
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository; 
    }

    // Creates a new user in the database
    async createUser(userData) {
        try {
            // Check if the email is already registered
            const existingUser = await this.userRepository.getUserByEmail(userData.email); 
            if(existingUser) {
                throw new Error('Email is already registered');
            }; 

            // Hash the user's password
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const userHashedPassword = {...userData, password: hashedPassword}; 

            // Save the new user with hashed password in the database
            const user =  await this.userRepository.createUser(userHashedPassword); 
            return user; 
        } 
        
        catch (error) {
            console.error('Error in UserService creating user:', error.message);
            throw error;
        }
    }

    // Gets data from user through email
    async getUserByEmail(userEmail) {
        try {
            const user =  await this.userRepository.getUserByEmail(userEmail); 
            return user; 
        } 
        
        catch (error) {
            console.error('Error in UserService getting user by email:', error.message);
            throw error;
        }
    }

    // Gets data from user through id
    async getUserById(userId) {
        try {
            const user =  await this.userRepository.getUserById(userId); 
            return user; 
        } 
        
        catch (error) {
            console.error('Error in UserService getting user by id:', error.message);
            throw error;
        }
    }

    // Gets all available users 
    async getAllUsers() {
        try {
            const users =  await this.userRepository.getAllUsers(); 
            return users; 
        } 
        
        catch (error) {
            console.error('Error in UserService getting all users:', error.message);
            throw error;
        }
    }

    // Updates data from user through id
    async updateUser(userId, updatedData) {
        try {
            const user =  await this.userRepository.updateUser(userId, updatedData); 
            return user; 
        } 
        
        catch (error) {
            console.error('Error in UserService updating user:', error.message);
            throw error;
        }
    }

    // Deletes data from user through id
    async deleteUser(userId) {
        try {
            const result =  await this.userRepository.deleteUser(userId); 
            return result; 
        } 
        
        catch (error) {
            console.error('Error in UserService deleting user:', error.message);
            throw error;
        }
    }

    // Login user (verify password and generate JWT)
    async loginUser(email, password) {
        try {
            //Verifies if user is in database
            const user = await this.userRepository.getUserByEmail(email); 
            if(!user) {
                throw new Error('User not found'); 
            }

            // Check if the password matches
            const validPassword = bcrypt.compare(password, user.password);
            if(!validPassword) {
                throw new Error('Invalid password'); 
            }

            // Generate a JWT token adding the user data as the payload 
            const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '1h'}); 
 
            
            return {user, token}; 
        } 
        
        catch (error) {
            console.error('Error in UserService logging in user:', error.message);
            throw error;  
        }
    }
}

export default UserService; 