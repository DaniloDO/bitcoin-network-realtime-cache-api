import axios from "axios";
import dotenv from 'dotenv';

const environment = process.env.NODE_ENV || "development";
dotenv.config({ path: `${environment}.env`}); 

// CoingeckoClient class responsible for managing HTTP requests to CoinGecko API
class CoingeckoClient {
    constructor() {
        // Check if an instance of CoingeckoClient already exists
        if(!CoingeckoClient.instance) {
            // Create an Axios client with predefined configuration (baseURL, timeout, headers)
            this.client = axios.create({
                baseURL: process.env.COINGECKO_API_URL,
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // Store the instance in CoingeckoClient.instance to prevent multiple instances from being created
            CoingeckoClient.instance = this;
        }

        return CoingeckoClient.instance; 
    }

    // Method to get the Axios client instance for making HTTP requests
    getClient() {
        return this.client;
    }
}

// Creates a new instance from CoingeckoClient class
const coinGeckoClient = new CoingeckoClient();

// Freeze the instance to prevent any modifications
Object.freeze(coinGeckoClient);

export default coinGeckoClient; 