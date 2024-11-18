//import all necessary dependencies and layers
import express from "express" ;
import mempoolClient from "../../config/mempoolClient.js";
import MiningRepository from "../../repositories/mempool/miningRepository.js";
import MiningService from "../../services/mempool/miningService.js";
import MiningController from "../../controllers/mempool/miningController.js";

const miningRouter = express.Router();

// Instantiate the repository, service and controller layer
const miningRepository = new MiningRepository(mempoolClient);
const miningService = new MiningService(miningRepository);
const miningController = new MiningController(miningService);

// Route to get all mining pools
miningRouter.get('/pools', (req, res) => miningController.getAllMiningPools(req, res));

// Route to get details from specific mining pool
miningRouter.get('/pool/:slug', (req, res) => miningController.getMiningPool(req, res));

// Route to get past 10 blocks mined by the specified mining pool 
miningRouter.get('/pool-blocks/:slug', (req, res) => miningController.getMiningPoolBlocks(req, res));

export default miningRouter; 