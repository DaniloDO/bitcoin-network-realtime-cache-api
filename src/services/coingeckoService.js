import redisClient from "../config/redisClient.js";

//CoingeckoService class to interact with the CoinGecko's API, and handle business logic.
class CoingeckoService {
    constructor(coingeckoRepository) {
        this.coingeckoRepository = coingeckoRepository;
    }

    // Fetch bitcoin price, market cap, and 24hr volume and changes
    async getBitcoinSimpleData() {
        try {
            //Create key to search data in Redis
            const cacheKey = 'bitcoin:simple-data';

            //Check for data in Redis
            const cacheData = await redisClient.getClient().get(cacheKey);
            if(cacheData) {
                console.log('Retrieved data from Redis cache');
                return JSON.parse(cacheData);
            }

            // Fetch data from repository if not cached
            const data = await this.coingeckoRepository.getBitcoinSimpleData();

            // Store fetched data in Redis cache with a 60-second expiration
            await redisClient.getClient().set(cacheKey, JSON.stringify(data), {'EX': 60*5});
            console.log('Data stored in Redis cache.');

            return data;
        }

        catch(error) {
            console.error('Error in coingeckoService fetching simple-data', error.message);
            throw error; 
        }
    }

    // Fetch all available bitcoin data
    async getBitcoinDetailedData() {
        try {
            //Create key to search data in Redis
            const cacheKey = 'bitcoin:detailed-data';

            //Check for data in Redis
            const cacheData = await redisClient.getClient().get(cacheKey);
            if(cacheData) {
                console.log('Retrieved data from Redis cache');
                return JSON.parse(cacheData);
            }

            // Fetch data from repository if not cached
            const data = await this.coingeckoRepository.getBitcoinDetailedData();

            // Store fetched data in Redis cache with a 60-second expiration
            await redisClient.getClient().set(cacheKey, JSON.stringify(data), {'EX': 60*5});
            console.log('Data stored in Redis cache');

            return data;
        }

        catch(error) {
            console.error('Error in coingeckoService fetching detailed-data', error.message);
            throw error; 
        }
    }

    // Fetch bitcoin historical chart data 
    async getBitcoinHistoricalChartData(days = 30){
        try {
            //Create key to search data in Redis
            const cacheKey = 'bitcoin:historical-chart-data';

            //Check for data in Redis
            const cacheData = await redisClient.getClient().get(cacheKey);
            if(cacheData) {
                console.log('Retrieve data from Redis');
                return JSON.parse(cacheData);
            }

            // Fetch data from repository if not cached
            const data = await this.coingeckoRepository.getBitcoinHistoricalChartData(days);

            // Store fetched data in Redis cache with a 60-second expiration
            await redisClient.getClient().set(cacheKey, JSON.stringify(data), {'EX': 60*5});
            console.log('Data stored in Redis cache'); 

            return data;
        }

        catch(error) {
            console.error('Error in coingeckoService fetching historical-chart-data', error.message);
            throw error;          
        }
    }
}

export default CoingeckoService; 