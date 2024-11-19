import redisClient from "../../config/redisClient.js";

//NetworkService class to interact with the Mempool's API, and handle business logic.
class NetworkService {
    constructor(networkRepository) {
        this.networkRepository = networkRepository; 
    }

    //Fetch details of difficulty-adjustment (Block timestamp, Block height, Difficulty, Difficulty change)
    async getDifficultAdjustment() {
        try {
            //Create key to search data in Redis
            const cacheKey = 'mempool:difficulty-adjustment';

            //Check for data in Redis
            const cacheData = await redisClient.getClient().get(cacheKey);
            if(cacheData) {
                console.log('Retrieved mempool difficulty-adjustment data from Redis cache');
                return JSON.parse(cacheData);
            };

            // Fetch data from repository if not cached
            const data = await this.networkRepository.getDifficultAdjustment();

            // Store fetched data in Redis cache with a 60-second expiration
            await redisClient.getClient().set(cacheKey, JSON.stringify(data), {'EX': 60});
            console.log('Mempool difficulty-adjustment data stored in Redis cache.');

            return data; 
        }

        catch(error) {
            console.error('Error in networkRepository fetching difficulty-adjustment data'); 
            throw error; 
        }
    }

    //Fetch details of hashrate
    async getHashRate() {
        try {
            //Create key to search data in Redis
            const cacheKey = 'mempool:hashrate';

            //Check for data in Redis
            const cacheData = await redisClient.getClient().get(cacheKey);
            if(cacheData) {
                console.log('Retrieved mempool hashrate data from Redis cache');
                return JSON.parse(cacheData);
            };

            // Fetch data from repository if not cached
            const data = await this.networkRepository.getHashRate();

            // Store fetched data in Redis cache with a 60-second expiration
            await redisClient.getClient().set(cacheKey, JSON.stringify(data), {'EX': 60});
            console.log('Mempool hashrate data stored in Redis cache.');

            return data; 
        }

        catch(error) {
            console.error('Error in networkRepository fetching hashrate data'); 
            throw error; 
        }       
    }
}

export default NetworkService; 