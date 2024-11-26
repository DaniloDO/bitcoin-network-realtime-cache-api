import redisClient from "../../config/redisClient.js";

// FeesService class to interact with the Mempool's API, and handle business logic.
class FeesService {
    constructor(feesRepository) {
        this.feesRepository = feesRepository;
    }

    // Fetch blocks fees
    async getBlocksFees() {
        try {
            // Create key to search data in Redis
            const cacheKey = 'mempool:blocks-fees';

            // Check for data in Redis
            const cacheData = await redisClient.getClient().get(cacheKey);
            if(cacheData) {
                console.log('Retrieved mempool blocks fees data from Redis cache');
                return JSON.parse(cacheData);
            };

            // Fetch data from repository if not cached
            const data = await this.feesRepository.getBlocksFees();

            // Store fetched data in Redis cache with a 60-second expiration
            await redisClient.getClient().set(cacheKey, JSON.stringify(data), {'EX': 60});
            console.log('Mempool blocks fees data stored in Redis cache.');

            return data; 
        }

        catch(error) {
            console.error('Error in fessService fetching blocks fees data');
            throw error; 
        }
    }
    
    // Fetch current suggested fees for new transactions
    async getRecommendedFees() {
        try {
            // Create key to search data in Redis
            const cacheKey = 'mempool:current-fees';

            // Check for data in Redis
            const cacheData = await redisClient.getClient().get(cacheKey);
            if(cacheData) {
                console.log('Retrieved mempool current fees data from Redis cache');
                return JSON.parse(cacheData);
            };

            // Fetch data from repository if not cached
            const data = await this.feesRepository.getRecommendedFees();

            // Store fetched data in Redis cache with a 60-second expiration
            await redisClient.getClient().set(cacheKey, JSON.stringify(data), {'EX': 60});
            console.log('Mempool current fees data stored in Redis cache.');

            return data; 
        }

        catch(error) {
            console.error('Error in feesService fetching recommended fees data');
            throw error; 
        }
    }
}

export default FeesService;