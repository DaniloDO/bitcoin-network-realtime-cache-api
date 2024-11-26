import redisClient from "../../config/redisClient.js";

// AddressService class to interact with the Mempool's API, and handle business logic.
class AddressService {
    constructor(addressRepository) {
        this.addressRepository = addressRepository; 
    }

    // Fetch details about a specific address
    async getAddress(address) {
        try {
            // Create key to search data in Redis
            const cacheKey = 'mempool:address';

            // Check for data in Redis
            const cacheData = await redisClient.getClient().get(cacheKey);
            if(cacheData) {
                console.log('Retrieved mempool address data from Redis cache');
                return JSON.parse(cacheData);
            }

            // Fetch data from repository if not cached
            const data = await this.addressRepository.getAddress(address);

            // Store fetched data in Redis cache with a 60-second expiration
            await redisClient.getClient().set(cacheKey, JSON.stringify(data), {'EX': 60});
            console.log('Mempool address data stored in Redis cache.');

            return data; 
        }

        catch(error) {
            console.error('Error in addressService fetching address data');
            throw error; 
        }
    }

    // Fetch transaction history for the specified address (50 mempool transactions plus the first 25 confirmed transactions)
    async getAddressTransactions(address) {
        try {
            // Create key to search data in Redis
            const cacheKey = 'mempool:address-tx';

            // Check for data in Redis
            const cacheData = await redisClient.getClient().get(cacheKey);
            if(cacheData) {
                console.log('Retrieved mempool transactions address data from Redis cache');
                return JSON.parse(cacheData);
            };

            // Fetch data from repository if not cached
            const data = await this.addressRepository.getAddressTransactions(address);

            // Store fetched data in Redis cache with a 60-second expiration
            await redisClient.getClient().set(cacheKey, JSON.stringify(data), {'EX': 60});
            console.log('Mempool transactions address data stored in Redis cache.');

            return data; 
        }

        catch(error) {
            console.error('Error in addressService fetching transactions data from address');
            throw error; 
        }     
    }
}

export default AddressService; 