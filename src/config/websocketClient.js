import WebSocket from "ws";
import EventEmitter from 'events';
import dotenv from 'dotenv';

dotenv.config();

// WebsocketClient class responsible for managing connection to Mempool WebSocket
class WebsocketClient extends EventEmitter {
    constructor() {
        // Invokes parent class constructor to use EventEmitter methods
        super(); 

        // Check if an instance of RedisClient already exists
        if(!WebsocketClient.instance) {
            this.client = null;
            this.url = process.env.MEMPOOL_WEBSOCKET_URL;
            this.data = ['blocks', 'mempool-blocks', 'transactions', 'live-2h-chart', 'stats']; 

            // Store the instance in WebsocketClient.instance to prevent multiple instances from being created
            WebsocketClient.instance = this; 
        }
    }

    // Method to connect with Mempool WebSocket 
    connect() {
        if(!this.client || this.client.readyState !== WebSocket.OPEN) {

            this.client = new WebSocket(this.url);

            // Open socket connection and sends subscription message 
            this.client.on('open', () => {
                console.log('Connected to Mempool WebSocket API');
                const subscriptionMessage = { 'action': 'want', data: this.data };
                this.client.send(JSON.stringify(subscriptionMessage));

            }); 

            // Listen to message and emits a local event 
            this.client.on('message', (message) => {
                try {
                    const data = JSON.parse(message); 
                    this.emit('data', data); 
                }

                catch(error) {
                    console.log('Error in websocketClient parsing message');
                    throw error; 
                }
            });

            // Listen to error connection issues 
            this.client.on('error', (error) => {
                console.error('WebSocket error:', error);
                return error; 
            });
    
            // Close socket connection 
            this.client.on('close', (code, reason) => {
                console.log(`Disconnected from Mempool WebSocket API (code: ${code}, reason: ${reason || "none"})`);
                setTimeout(() => this.connect(), 5000);
            }); 
        };
    }

    // Method to disconnect with Mempool WebSocket 
    disconnect() {
        if(this.client) {
            this.client.close(); 
            this.client = null; 
        }
    }

}

// Creates a new instance from WebsocketClient class
const websocketClient = new WebsocketClient();

export default websocketClient; 