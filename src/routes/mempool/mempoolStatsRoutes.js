// import all necessary dependencies and layers
import express from "express" ;
import mempoolClient from "../../config/mempoolClient.js";
import MempoolStatsRepository from "../../repositories/mempool/mempoolStatsRepository.js"
import MempoolStatsService from "../../services/mempool/mempoolStatsService.js";
import MempoolStatsController from "../../controllers/mempool/mempoolStatsController.js";

const mempoolStatsRouter = express.Router();

// Instantiate the repository, service and controller layer
const mempoolStatsRepository = new MempoolStatsRepository(mempoolClient);
const mempoolStatsService = new MempoolStatsService(mempoolStatsRepository);
const mempoolStatsController = new MempoolStatsController(mempoolStatsService);

// Route to get mempool stats data
mempoolStatsRouter.get('/', (req, res) => mempoolStatsController.getMempoolStats(req, res));

export default mempoolStatsRouter; 