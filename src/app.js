import express from 'express';
import dotenv from 'dotenv';
import coingeckoRouter from './routes/coingecko/coingeckoRoutes.js';
import mempoolRouter from './routes/mempool/mempoolRoutes.js'
import realtimeRouter from './routes/realtime/realtimeRoutes.js'
import websocketClient from './config/websocketClient.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000; 

// Apply middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/coingecko', coingeckoRouter);
app.use('/api/mempool', mempoolRouter);
app.use('/api/realtime', realtimeRouter);  

app.set('json spaces', 2);

//Connects with Mempool WebSocket
websocketClient.connect(); 

// Default route to verify the server is running
app.get('/', (req, res) => {
    res.send('bitcoin-network-realtime-cache-api is running');
});

//Shuts down the server
process.on('SIGINT', () => {
    console.log('Shutting down server');
    websocketClient.disconnect();
    process.exit(0);  
})

app.listen(port, () => console.log(`Listening on port:${port}`));