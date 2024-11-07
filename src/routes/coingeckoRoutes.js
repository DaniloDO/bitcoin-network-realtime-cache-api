//import all necessary dependencies and layers
import express from "express" ;
import coinGeckoClient from "../config/coingeckoClient.js";
import CoinGeckoRepository from "../repositories/coingeckoRepository.js";
import CoingeckoService from "../services/coingeckoService.js";
import CoingeckoController from "../controllers/coingeckoController.js";

const coingeckoRouter = express.Router();

// Instantiate the repository, service and controller layer
const coingeckoRepository = new CoinGeckoRepository(coinGeckoClient);
const coingeckoService = new CoingeckoService(coingeckoRepository);
const coingeckoController = new CoingeckoController(coingeckoService);

// Route to get bitcoin price
coingeckoRouter.get('/simple-data', (req, res) => coingeckoController.getBitcoinSimpleData(req, res));

// Route to get bitcoin market data
coingeckoRouter.get('/detailed-data', (req, res) => coingeckoController.getBitcoinDetailedData(req, res));

// Route to get bitcoin historical chart data
coingeckoRouter.get('/historical-chart-data', (req, res) => coingeckoController.getBitcoinHistoricalChartData(req, res));

export default coingeckoRouter; 