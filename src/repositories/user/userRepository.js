// UserRepository class responsible of fetching data from MongoDB (users)
class UserRepository {
    constructor(userModel) {
        this.userModel = userModel; 
    }

    // Creates a new user in the database
    async createUser(userData) {
        try {
            const user = new this.userModel(userData); 
            return await user.save();     
        } 
        
        catch (error) {
            console.error('Error in UserRepository creating user:', error.message);
            throw error;
        }
    }

    // Gets data from user through email
    async getUserByEmail(userEmail) {
        const query = { 'email': userEmail };

        try {
            return await this.userModel.findOne(query); 
        } 
        
        catch (error) {
            console.error('Error in UserRepository finding user by email:', error.message);
            throw error; 
        }
    }
    
    // Gets data from user through id
    async getUserById(userId) {
        const query = { '_id': userId }; 

        try {
            return await this.userModel.findOne(query); 
        } 
        
        catch (error) {
            console.error('Error in UserRepository finding user by id:', error.message);
            throw error; 
        }
    }
    // Gets all available users 
    async getAllUsers() {
        try {
            const users = await this.userModel.find(); 
            return users; 
        } 
        
        catch (error) {
            console.error('Error in UserRepository finding all users:', error.message);
            throw error; 
        }
    }

    // Updates data from user through id
    async updateUser(userId, updatedData) {
        const query = { '_id': userId }; 

        try {
            const user = await this.userModel.findOne(query)
            if(!user) throw new Error('User not found');

            // Merges data at first level excluding nested objects
            Object.assign(user, updatedData); 

            // Updates subscriptions nested object
            if(updatedData.subscriptions) {
                Object.assign(user.subscriptions, updatedData.subscriptions); 
            }

            return await user.save(); 
        } 
        
        catch (error) {
            console.error('Error in UserRepository updating user data:', error.message);
            throw error;    
        }
    }

    // Deletes data from user through id
    async deleteUser(userId) {
        const query = { '_id': userId }; 

        try {
            return await this.userModel.deleteOne(query);
        } 
        
        catch (error) {
            console.error('Error in UserRepository deleting user data:', error.message);
            throw error;  
        }
    }
}

export default UserRepository; 