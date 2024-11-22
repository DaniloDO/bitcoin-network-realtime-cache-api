import redisClient from "../../config/redisClient.js";

// WebsocketRepository class responsible of managing real-time data from Mempool’s WebSocket
class WebsocketRepository {
    constructor(websocketClient) {
        this.websocketClient = websocketClient;
        this.latestData = null;
        this.initListener(); 
    }

    //Listen to local event and receives real-time data from WebSocket connection
    initListener() {
        try {
            this.websocketClient.on('data', async (data) => {
                // console.log('Real-time data received:', data);
                this.latestData = data; 

                for(const key in data) {
                    //Create key to search data in Redis
                    const cacheKey = `realtime:${key}`; 

                    //Set expiration time for Redis keys
                    let expiration; 
                    if(key == 'blocks' || 'live-2h-chart' || 'loadingIndicators' || 'conversion') {
                        expiration = 60*60; 
                    }
                    else {
                        expiration = 60; 
                    }

                    //Store fetched data in Redis cache with an adjustable expiration rate
                    await redisClient.getClient().set(cacheKey, JSON.stringify(data[key]), {'EX': expiration});
                    // console.log(`${key} data stored in Redis cache.`);  
                }
            });
        }

        catch(error) {
            console.error('Error in websocketRepository getting real-time data'); 
            throw error; 
        }

    }

    //Gets all available data from the WebSocket
    getLatestData() {
        return this.latestData; 
    }

}

export default WebsocketRepository; 