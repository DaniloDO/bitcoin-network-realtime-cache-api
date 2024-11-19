import redisClient from "../../config/redisClient.js";

//TransactionsService class to interact with the Mempool's API, and handle business logic.
class TransactionsService {
    constructor(transactionsRepository) {
        this.transactionsRepository = transactionsRepository; 
    }

    // Fetch current mempool backlog statistics.
    async getTransactionById(transactionId) {
        try {
            //Create key to search data in Redis
            const cacheKey = 'mempool:transaction';

            //Check for data in Redis
            const cacheData = await redisClient.getClient().get(cacheKey);
            if(cacheData) {
                console.log('Retrieved mempool transaction data from Redis cache');
                return JSON.parse(cacheData);
            };

            // Fetch data from repository if not cached
            const data = await this.transactionsRepository.getTransactionById(transactionId);

            // Store fetched data in Redis cache with a 60-second expiration
            await redisClient.getClient().set(cacheKey, JSON.stringify(data), {'EX': 60});
            console.log('Mempool transaction data stored in Redis cache.');

            return data; 
        }

        catch(error) {
            console.error('Error in transactionsService fetching transaction data'); 
            throw error; 
        }
    }
}

export default TransactionsService; 