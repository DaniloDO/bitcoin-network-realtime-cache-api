import redisClient from "../../config/redisClient.js";

// MempoolStatsService class to interact with the Mempool's API, and handle business logic.
class MempoolStatsService {
    constructor(mempoolRepository) {
        this.mempoolRepository = mempoolRepository;
    }

    // Fetch current mempool backlog statistics.
    async getMempoolStats() {
        try {
            // Create key to search data in Redis
            const cacheKey = 'mempool:stats'; 

            // Check for data in Redis
            const cacheData = await redisClient.getClient().get(cacheKey);
            if(cacheData) {
                console.log('Retrieved mempool stats data from Redis cache');
                return JSON.parse(cacheData); 
            };

            // Fetch data from repository if not cached
            const data = await this.mempoolRepository.getMempoolStats();

            // Store fetched data in Redis cache with a 60-second expiration
            await redisClient.getClient().set(cacheKey, JSON.stringify(data), {'EX': 60});
            console.log('Mempool stats data stored in Redis cache.');

            return data; 
        }

        catch(error) {
            console.error('Error in mempoolStatsRepository fetching mempool data'); 
            throw error; 
        }
    }
}

export default MempoolStatsService; 