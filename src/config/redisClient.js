import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

// RedisClient class responsible for managing server connection to Redis
class RedisClient {
    constructor() {
        // Check if an instance of RedisClient already exists
        if(!RedisClient.instance){
            // Create a Redis client with predefined configuration
            this.client = redis.createClient({
                url: process.env.REDIS_URL
            });

            this.client.on('error', (error) => console.error('Error in Redis:', error));
            this.client.connect();

            // Store the instance in RedisClient.instance to prevent multiple instances from being created
            RedisClient.instance = this;
        }

        return RedisClient.instance;
    }

    // Method to get the Redis client instance for making requests
    getClient() {
        return this.client;
    }
}

// Creates a new instance from RedisClient class
const redisClient = new RedisClient();

export default redisClient;