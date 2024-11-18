//import all necessary dependencies and layers
import express from "express" ;
import mempoolClient from "../../config/mempoolClient.js";
import NetworkRepository from "../../repositories/mempool/networkRepository.js";
import NetworkService from "../../services/mempool/networkService.js";
import NetworkController from "../../controllers/mempool/networkController.js";

const networkRouter = express.Router();

// Instantiate the repository, service and controller layer
const networkRepository = new NetworkRepository(mempoolClient);
const networkService = new NetworkService(networkRepository);
const networkController = new NetworkController(networkService);

// Route to get difficulty-adjustment data
networkRouter.get('/difficulty-adjustment', (req, res) => networkController.getDifficultAdjustment(req, res));

// Route to get hashrate data
networkRouter.get('/hashrate', (req, res) => networkController.getHashRate(req, res));

export default networkRouter; 