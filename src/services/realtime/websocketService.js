import redisClient from "../../config/redisClient.js";

//WebsocketService class to interact with the Mempool's WebSocket, and handle business logic.
class WebsocketService {
    constructor(websocketRepository) {
        this.websocketRepository = websocketRepository; 
    }

    //Shows available data from WebSocket connection
    AvailableData(type) {
        return {
            available: [
                'mempoolInfo', 
                'vBytesPerSecond',
                'transactions',
                'da',
                'fees',
                'mempool-blocks',
                'block',
                'live-2h-chart',
                'loadingIndicators',
                'conversion'
            ]          
        }
    }

    //Gets specific requested data
    async getDataType(type) {
        try {
            //Create key to search data in Redis
            const cacheKey = `realtime:${type}`; 

            //Check for data in Redis
            const cacheData = await redisClient.getClient().get(cacheKey);
            if(cacheData) {
                console.log(`Retrieved ${type} data from Redis cache`, cacheData);
                return JSON.parse(cacheData); 
            }

            // Fetch data from repository if not cached
            const data = this.websocketRepository.getLatestData();

            if(data[type]) {
                return data[type]; 
            }    
        } 
        
        catch(error) {
            console.error(`Error in websocketService getting ${type} data`); 
            throw error; 
        }  
    }
    
    //Gets all available data from the WebSocket
    getLatestData() {
        try {
            return this.websocketRepository.getLatestData(); 
        }

        catch(error) {
            console.error(`Error in websocketService getting latest data`); 
            throw error;   
        }
    }
}

export default WebsocketService; 