import redisClient from "../../config/redisClient.js";

//BlocksService class to interact with the Mempool's API, and handle business logic.
class BlocksService {
    constructor(blocksRepository) {
        this.blocksRepository = blocksRepository;
    }

    // Fetch the past 15 blocks with fee and mining details 
    async getRecentBlocks() {
        try {
            //Create key to search data in Redis
            const cacheKey = 'mempool:recent-blocks';

            //Check for data in Redis
            const cacheData = await redisClient.getClient().get(cacheKey);
            if(cacheData) {
                console.log('Retrieved mempool recent blocks data from Redis cache');
                return JSON.parse(cacheData);
            };

            // Fetch data from repository if not cached
            const data = await this.blocksRepository.getRecentBlocks();

            // Store fetched data in Redis cache with a 60-second expiration
            await redisClient.getClient().set(cacheKey, JSON.stringify(data), {'EX': 60});
            console.log('Mempool recent blocks data stored in Redis cache.');

            return data; 
        }

        catch(error) {
            console.error('Error in blocksService fetching recent blocks data');
            throw error; 
        }
    }

    // Fetch details about a block
    async getBlockDetails(blockHash) {
        try {
            //Create key to search data in Redis
            const cacheKey = 'mempool:block-details';

            //Check for data in Redis
            const cacheData = await redisClient.getClient().get(cacheKey);
            if(cacheData) {
                console.log('Retrieved mempool block details data from Redis cache');
                return JSON.parse(cacheData);

            };

            // Fetch data from repository if not cached
            const data = await this.blocksRepository.getBlockDetails(blockHash);

            // Store fetched data in Redis cache with a 60-second expiration
            await redisClient.getClient().set(cacheKey, JSON.stringify(data), {'EX': 60});
            console.log('Mempool block details data stored in Redis cache.');

            return data; 
        }

        catch(error) {
            console.error('Error in blocksService fetching block details data');
            throw error; 
        }
    }

   // Fetch the confirmation status of a block
    async getBlockStatus(blockHash) {
        try {
            //Create key to search data in Redis
            const cacheKey = 'mempool:block-status';

            //Check for data in Redis
            const cacheData = await redisClient.getClient().get(cacheKey);
            if(cacheData) {
                console.log('Retrieved mempool block status data from Redis cache');
                return JSON.parse(cacheData);

            };

            // Fetch data from repository if not cached
            const data = await this.blocksRepository.getBlockStatus(blockHash);

            // Store fetched data in Redis cache with a 60-second expiration
            await redisClient.getClient().set(cacheKey, JSON.stringify(data), {'EX': 60});
            console.log('Mempool block status data stored in Redis cache.');

            return data; 
        }

        catch(error) {
            console.error('Error in blocksService fetching block status data');
            throw error; 
        }
    }
}

export default BlocksService; 