import redisClient from "../../config/redisClient.js";

// NetworkService class to interact with the Mempool's API, and handle business logic.
class MiningService {
    constructor(miningRepository) {
        this.miningRepository = miningRepository; 
    }

    // Fetch a list of all known mining pools 
    async getAllMiningPools() {
        try {
            // Create key to search data in Redis
            const cacheKey = 'mempool:mining-pools';

            // Check for data in Redis
            const cacheData = await redisClient.getClient().get(cacheKey);
            if(cacheData) {
                console.log('Retrieved all mempool mining pools data from Redis cache');
                return JSON.parse(cacheData);
            };

            // Fetch data from repository if not cached
            const data = await this.miningRepository.getAllMiningPools();

            // Store fetched data in Redis cache with a 60-second expiration
            await redisClient.getClient().set(cacheKey, JSON.stringify(data), {'EX': 60});
            console.log('All mempool mining pools data stored in Redis cache.');

            return data; 
        }

        catch(error) {
            console.error('Error in miningRepository fetching all mining pools data'); 
            throw error; 
        }
    }

    // Fetch details of specific mining pool 
    async getMiningPool(slug) {
        try {
            // Create key to search data in Redis
            const cacheKey = 'mempool:mining-pool';

            // Check for data in Redis
            const cacheData = await redisClient.getClient().get(cacheKey);
            if(cacheData) {
                console.log('Retrieved mempool mining pool data from Redis cache');
                return JSON.parse(cacheData);
            };

            // Fetch data from repository if not cached
            const data = await this.miningRepository.getMiningPool(slug);

            // Store fetched data in Redis cache with a 60-second expiration
            await redisClient.getClient().set(cacheKey, JSON.stringify(data), {'EX': 60});
            console.log('Mempool mining pool data stored in Redis cache.');

            return data; 
        }

        catch(error) {
            console.error('Error in miningRepository fetching mining pool data'); 
            throw error; 
        }   
    }

    // Fetch past 10 blocks mined by the specified mining pool 
    async getMiningPoolBlocks(slug) {
        try {
            // Create key to search data in Redis
            const cacheKey = 'mempool:pool-blocks';

            // Check for data in Redis
            const cacheData = await redisClient.getClient().get(cacheKey);
            if(cacheData) {
                console.log('Retrieved mempool mining pool blocks data from Redis cache');
                return JSON.parse(cacheData);
            };

            // Fetch data from repository if not cached
            const data = await this.miningRepository.getMiningPoolBlocks(slug);

            // Store fetched data in Redis cache with a 60-second expiration
            await redisClient.getClient().set(cacheKey, JSON.stringify(data), {'EX': 60});
            console.log('Mempool mining pool blocks data stored in Redis cache.');

            return data; 
        }

        catch(error) {
            console.error('Error in miningRepository fetching blocks mined from specific pool'); 
            throw error; 
        }     
    }
}

export default MiningService; 