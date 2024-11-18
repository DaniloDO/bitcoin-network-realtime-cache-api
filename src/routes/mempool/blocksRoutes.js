//import all necessary dependencies and layers
import express from "express" ;
import mempoolClient from "../../config/mempoolClient.js";
import BlocksRepository from "../../repositories/mempool/blocksRepository.js";
import BlocksService from "../../services/mempool/blocksService.js";
import BlocksController from "../../controllers/mempool/blocksController.js";

const blocksRouter = express.Router();

// Instantiate the repository, service and controller layer
const blocksRepository = new BlocksRepository(mempoolClient); 
const blocksService = new BlocksService(blocksRepository);
const blocksController = new BlocksController(blocksService);

// Route to get recent blocks
blocksRouter.get('/recent-blocks', (req, res) => blocksController.getRecentBlocks(req, res));

// Route to get block details
blocksRouter.get('/block-details/:blockHash', (req, res) => blocksController.getBlockDetails(req, res));

// Route to get block status
blocksRouter.get('/block-status/:blockHash', (req, res) => blocksController.getBlockStatus(req, res));

export default blocksRouter; 