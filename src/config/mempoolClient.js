import axios from "axios";
import dotenv from 'dotenv';

const environment = process.env.NODE_ENV || "development";
dotenv.config({ path: `${environment}.env`}); 

// MempoolClient class responsible for managing HTTP requests to Mempool API
class MempoolClient {
    constructor() {
        // Check if an instance of MempoolClient already exists
        if(!MempoolClient.instance) {
            // Create an Axios client with predefined configuration (baseURL, timeout, headers)
            this.client = axios.create({
                baseURL: process.env.MEMPOOL_API_URL,
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // Store the instance in MempoolClient.instance to prevent multiple instances from being created
            MempoolClient.instance = this;
        }

        return MempoolClient.instance;
    }

    // Method to get the Axios client instance for making HTTP requests
    getClient() {
        return this.client;
    }
}

// Creates a new instance from MempoolClient class
const mempoolClient = new MempoolClient();

// Freeze the instance to prevent any modifications
Object.freeze(mempoolClient);

export default mempoolClient;