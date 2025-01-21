import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import coingeckoRouter from './src/routes/coingecko/coingeckoRoutes.js';
import mempoolRouter from './src/routes/mempool/mempoolRoutes.js';
import realtimeRouter from './src/routes/realtime/realtimeRoutes.js';
import userRouter from './src/routes/user/userRoutes.js';
import websocketClient from './src/config/websocketClient.js';
import mongoConnection from './src/database/config/mongoConfig.js';

const environment = process.env.NODE_ENV || "development";
dotenv.config({ path: `${environment}.env`}); 

console.log(`environment: ${environment}`);

const app = express();

const port = process.env.PORT || 3000; 

// Handle MongoDB connection
mongoConnection;

// Apply middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.use('/api/coingecko', coingeckoRouter);
app.use('/api/mempool', mempoolRouter);
app.use('/api/realtime', realtimeRouter);
app.use('/api/user', userRouter);   

app.set('json spaces', 2);

// Connects with Mempool WebSocket
websocketClient.connect(); 

// Default route to verify the server is running
app.get('/', (req, res) => {
    res.send('bitcoin-network-realtime-cache-api is running');
});

// Shuts down the server
process.on('SIGINT', () => {
    console.log('Shutting down server');
    websocketClient.disconnect();
    process.exit(0);  
})

app.listen(port, () => console.log(`Listening on port:${port}`));