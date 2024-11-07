import express from 'express';
import dotenv from 'dotenv';
import coingeckoRouter from './routes/coingeckoRoutes.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000; 

// Apply middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/coingecko', coingeckoRouter); 

app.set('json spaces', 2);

// Default route to verify the server is running
app.get('/', (req, res) => {
    res.send('bitcoin-network-realtime-cache-api is running');
});

app.listen(port, () => console.log(`Listening on port:${port}`));